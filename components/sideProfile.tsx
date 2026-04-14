"use client"
import { useToken } from '@/lib/auth-route';
import { getUserProfile } from '@/lib/profile-route';
import { get } from 'http';
import React, { useEffect, useState } from 'react'



const SideProfile = () => {

    const [profile,setProfile] = useState<{ name: string; email: string }>({ name: '', email: '' })

    const token = useToken()

    useEffect(() => {
        const fetchProfile = async () => {
            if (!token) return
            const profileData=await getUserProfile(token)
            setProfile({ name: profileData.fullname, email: profileData.email })
        }   
        fetchProfile()
    }, [token])

  return (

    <div className='flex flex-col gap-1'>
        <p >{profile.name}</p>
        <p className='text-xs text-slate-400'>{profile.email}</p>
    </div>
  )
}

export default SideProfile