'use server'

import { supabaseServer } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export type LeadState = {
    success?: boolean
    error?: string
    message?: string
}

export async function submitLead(prevState: LeadState | null, formData: FormData): Promise<LeadState> {
    try {
        const name = formData.get('name') as string
        const email = formData.get('email') as string
        const phone = formData.get('phone') as string
        const message = formData.get('message') as string
        const source = formData.get('source') as string || 'Unknown'
        const page_path = formData.get('page_path') as string || '/'

        // Simple validation
        if (!name || !email) {
            return { error: 'Name and Email are required.' }
        }

        const supabase = await supabaseServer()

        const { error, status } = await supabase.from('leads').insert({
            name,
            email,
            phone,
            message,
            source,
            page_path,
        })

        // If status is 201 (Created), we consider it a success even if there is an error 
        // (often due to RLS preventing the 'select' return of the inserted row)
        if (error && status !== 201) {
            console.error('Lead submission error:', error)
            return { error: 'Failed to submit lead. Please try again.' }
        }

        // Optional: Send email notification here using Brevo/Nodemailer

        try {
            revalidatePath('/admin/leads')
        } catch (e) {
            // Ignore revalidation errors to prevent failing the submission
            console.error('Revalidation failed:', e)
        }

        return { success: true, message: 'Thank you! We will contact you soon.' }
    } catch (err) {
        console.error('Lead submission exception:', err)
        return { error: 'Something went wrong.' }
    }
}
