'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import toast from 'react-hot-toast'

export default function SettingsPage() {
  const [email, setEmail] = useState('')
  const [newPass, setNewPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [sending, setSending] = useState(false)
  const [changing, setChanging] = useState(false)

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.email) setEmail(user.email)
    }
    load()
  }, [])

  const sendResetEmail = async () => {
    if (!email) return toast.error('Enter your email')
    setSending(true)
    try {
      const origin = typeof window !== 'undefined' ? window.location.origin : ''
      const redirectTo = `${origin}/reset-password`
      const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo })
      if (error) throw error
      toast.success('Reset link sent to your email ✅')
    } catch (e: any) {
      toast.error(e.message || 'Failed to send reset email')
    } finally {
      setSending(false)
    }
  }

  const changePassword = async () => {
    if (newPass.length < 8) return toast.error('Password must be at least 8 characters')
    if (newPass !== confirmPass) return toast.error('Passwords do not match')

    setChanging(true)
    try {
      const { error } = await supabase.auth.updateUser({ password: newPass })
      if (error) throw error
      setNewPass('')
      setConfirmPass('')
      toast.success('Password changed ✅')
    } catch (e: any) {
      toast.error(e.message || 'Failed to change password')
    } finally {
      setChanging(false)
    }
  }

  return (
    <div className="max-w-2xl space-y-8">
      <h1 className="text-2xl font-bold">Settings</h1>

      {/* Send reset email (OTP link) */}
      <section className="border rounded-lg p-5 bg-white">
        <h2 className="font-semibold mb-3">Forgot password?</h2>
        <p className="text-sm text-gray-600 mb-4">
          We’ll email you a one-time reset link. Open it and set a new password.
        </p>
        <div className="flex gap-3 max-sm:flex-col">
          <input
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 px-3 py-2 border rounded"
          />
          <button
            onClick={sendResetEmail}
            disabled={sending}
            className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-60"
          >
            {sending ? 'Sending…' : 'Send reset email'}
          </button>
        </div>
      </section>

      {/* Change password (logged-in) */}
      <section className="border rounded-lg p-5 bg-white">
        <h2 className="font-semibold mb-3">Change password (you’re logged in)</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            type="password"
            placeholder="New password"
            value={newPass}
            onChange={(e)=>setNewPass(e.target.value)}
            className="px-3 py-2 border rounded"
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPass}
            onChange={(e)=>setConfirmPass(e.target.value)}
            className="px-3 py-2 border rounded"
          />
        </div>
        <button
          onClick={changePassword}
          disabled={changing}
          className="mt-3 px-4 py-2 rounded bg-emerald-600 text-white disabled:opacity-60"
        >
          {changing ? 'Saving…' : 'Change password'}
        </button>
      </section>
    </div>
  )
}
