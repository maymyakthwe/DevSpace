import Image from 'next/image'
import React from 'react'
import logo from '../public/logo.png'
import {ArrowRight} from 'lucide-react'
import Link from 'next/link'


const Navbar = () => {
  return (
    <div className='bg-background-1 min-h-15 w-full flex items-center justify-between px-4 border-b border-slate-700/30'>
        <div>
            <Link href="/"  className=' py-5 px-10  text-2xl flex  items-center gap-2 '>
                <Image src={logo} alt="logo" width={50} height={50} className='inline-block mr-2 rounded-2xl' />
                <h1>DevSpace</h1>
            </Link>
        </div>
        <div className='flex'>
            <div className='px-5 py-2 hover:bg-card rounded-lg  duration-300 text-off-white-2 font-semibold hover:text-white'>
                <Link href="/auth/register">Sign In</Link></div>
            <div className='px-4 py-2 bg-primary hover:bg-primary/80 flex text-white items-center gap-1 rounded-lg duration-300 font-semibold ml-4'>
                <Link href='/auth/register'>Get Started</Link>
                <ArrowRight size={18}  />
            </div>
        </div>
    </div>
  )
}

export default Navbar