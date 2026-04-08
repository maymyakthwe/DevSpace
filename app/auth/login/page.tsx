"use client"
import React, { useState } from 'react'
import { Mail, LockKeyhole } from 'lucide-react'
import { loginUser } from '@/lib/auth-route'
import { signIn } from 'next-auth/react'
import { useRouter } from "next/navigation"
import Link from 'next/link'

const Page = () => {
  const router = useRouter()

  const [data, setData] = useState<{ email: string, password: string }>({
    email: '',
    password: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await loginUser(data)
      alert("Login successful!")
      router.push("/dashboard/overview")
    } catch (error) {
      console.error("Login failed:", error instanceof Error ? error.message : error)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen gap-8 bg-background py-5'>
      <div className='text-center text-off-white-1'>
        <h1 className='text-3xl font-bold mb-3'>DevSpace</h1>
        <p className='text-off-white-2'>Sign in to your account</p>
      </div>
      <div className='w-1/3 min-h-125 border border-slate-700/50 bg-card rounded-lg p-8'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
          <div className='flex flex-col gap-2 text-sm'>
            <label htmlFor="email">Email</label>
            <div className='border border-slate-700/50 rounded-2xl bg-background-2 focus-within:border-primary focus-within:border-2 focus-within:ring-1 focus-within:ring-primary transition duration-300 flex items-center'>
              <Mail size={20} className='text-off-white-2 ml-4' />
              <input className='w-full h-full p-4 outline-none'
                type="text"
                id="email"
                placeholder='name@example.com'
                name='email'
                value={data.email}
                onChange={handleChange} />
            </div>
          </div>
          <div className='flex flex-col gap-2 text-sm'>
            <label htmlFor="password">Password</label>
            <div className='border border-slate-700/50 rounded-2xl bg-background-2 focus-within:border-primary focus-within:border-2 focus-within:ring-1 focus-within:ring-primary transition duration-300 flex items-center'>
              <LockKeyhole size={20} className='text-off-white-2 ml-4' />
              <input className='w-full h-full p-4 outline-none'
                type="password"
                id="password"
                placeholder='Password'
                name='password'
                value={data.password}
                onChange={handleChange} />
            </div>
          </div>
          <div className='flex justify-end text-primary/90 hover:text-primary/70 transition duration-100 cursor-pointer'>
            <label className='text-sm'>Forgot password?</label>
          </div>
          <button type='submit' className='bg-primary text-white py-3 rounded-2xl hover:bg-primary/90 transition duration-300 shadow-md shadow-primary/30'>
            Sign In
          </button>
        </form>
        <div>
          <div className='flex text-xs text-off-white-2/70 items-center justify-center my-6 gap-2'>
            <div className='border-b border-slate-700/50 grow'></div>
            <div>OR CONTINUE WITH</div>
            <div className='border-b border-slate-700/50 grow'></div>
          </div>
          <div className='flex items-center justify-between gap-4'>
            <button
              onClick={() => signIn("google", { callbackUrl: "/auth/setup-check" })}
              className='flex justify-center items-center font-semibold text-off-white-1 rounded-2xl border border-slate-700/50 bg-background-2 hover:bg-background-3 transition duration-300 cursor-pointer flex-1 py-3'>
              <svg className="size-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
              </svg>
              Google
            </button>
            <button
              onClick={() => signIn("github", { callbackUrl: "/auth/setup-check" })}
              className='flex justify-center items-center font-semibold text-off-white-1 rounded-2xl border border-slate-700/50 bg-background-2 hover:bg-background-3 transition duration-300 cursor-pointer flex-1 py-3'>
              <svg className="size-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Github
            </button>
          </div>
          <div className='text-center my-5 text-sm text-off-white-2/70'>
            Don&apos;t have an account? <span className='text-primary/90 hover:text-primary/70 transition duration-100 cursor-pointer'><Link href={"/auth/register"}>Sign up</Link></span>
          </div>
        </div>
      </div>
      <div className='text-off-white-2/70 text-xs'>By signing in, You agree to our Terms of Service and Privacy Policy.</div>
    </div>
  )
}

export default Page