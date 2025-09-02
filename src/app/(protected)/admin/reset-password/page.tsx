'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setMessage('Error: ' + error.message)
    } else {
      setMessage('Password updated. Redirecting...')
      setTimeout(() => router.push('/admin'), 2000)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 px-4">
      {/* Top Logo */}
      <div className="absolute top-6 left-6">
        <img
          src="/images/logo.png" // 👈 Replace with your actual logo path (e.g. public/logo.png)
          alt="Web Digital Bazaar"
          className="h-50 drop-shadow-lg"
        />
      </div>
      <form
        onSubmit={handleReset}
        className="bg-white/10 backdrop-blur-md p-8 rounded-xl max-w-sm w-full text-white shadow-lg"
      >
        <h2 className="text-center text-2xl font-bold mb-6">Reset Password</h2>

        <input
          type="password"
          required
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 bg-white/20 border border-white/30 rounded placeholder-white/70"
        />

        <button
          type="submit"
          className="w-full bg-white/20 border border-white/30 py-2 rounded font-semibold hover:bg-white/30 transition"
        >
          Set New Password
        </button>

        {message && <p className="mt-4 text-sm text-center">{message}</p>}
      </form>
    </div>
  )
}
