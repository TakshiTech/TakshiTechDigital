'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase/browser'
import { motion } from 'framer-motion'
import { Loader2, Lock, Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const onLogin = async () => {
    if (loading) return
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) return alert(error.message)
    window.location.href = '/admin'
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') onLogin()
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 relative"
      onKeyDown={onKeyDown}
    >
      {/* Company Logo - Top Center */}
      <div className="absolute top-6 w-full flex justify-center">
        <img
          src="/logo.svg"
          alt="Company Logo"
          className="h-12 w-auto drop-shadow-lg"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-sm p-8 rounded-2xl shadow-2xl bg-gray-950 border border-gray-800"
      >
        <div className="flex flex-col items-center mb-6">
          <motion.div
            initial={{ scale: 0.6, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
            className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 shadow-lg"
          >
            <Lock className="text-white w-7 h-7" />
          </motion.div>
          <h1 className="text-2xl font-bold text-white mt-4">Admin Login</h1>
          <p className="text-gray-400 text-sm">Sign in to access the dashboard</p>
        </div>

        <div className="space-y-4">
          <motion.input
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Email"
            type="email"
            autoComplete="email"
            inputMode="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password with show/hide */}
          <motion.div
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            <input
              className="w-full px-4 py-3 pr-12 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword((s) => !s)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-200 transition"
              tabIndex={0}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </motion.div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          disabled={loading}
          onClick={onLogin}
          className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Logging in…
            </>
          ) : (
            'Login'
          )}
        </motion.button>
      </motion.div>
    </div>
  )
}
