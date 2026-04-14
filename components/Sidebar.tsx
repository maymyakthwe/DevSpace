
import logo from '../public/logo.png'
import Image from 'next/image'
import {Blocks,Folder,CodeXml,User,Award} from 'lucide-react'
import { sidebarProps } from '@/Types/types'
import SideComponent from './SideComponent'
import Menu from './Menu'
import Link from 'next/link'
import SideProfile from './sideProfile'

const sidelinks:sidebarProps[] = [
  {
    name: 'Overview',
    icon: <Blocks size={20} />,
    href: '/dashboard/overview'
  },
  {   name: 'Projects',   
    icon: <Folder size={20} />,
    href: '/dashboard/projects'
  },
  {
    name: 'Skills',
    icon: <CodeXml size={20} />,
    href: '/dashboard/skills'
  },
  {
    name: 'Achievements',
    icon: <Award size={20} />,
    href: '/dashboard/achievements'
  },
  {
    name: 'Profile',
    icon: <User size={20} />,
    href: '/dashboard/profile'
  }
]


const Sidebar = () => {


  return (
    <div className='w-[25%] bg-card h-full border-slate-800 border-r flex flex-col justify-between text-off-white-1'>
      <div >
        <Link href="/" className='border-slate-800 border-b py-5 px-10  text-2xl flex  items-center gap-2 '>
            <Image src={logo} alt="logo" width={50} height={50} className='inline-block mr-2 rounded-2xl' />
            <h1>DevSpace</h1>
        </Link>
        <div className='py-5 px-10'>
          <ul className='flex flex-col gap-3'>
            {sidelinks.map((link,index) => (
              <li key={index} >
                <SideComponent href={link.href} name={link.name} icon={link.icon} />
              </li>
            ))}
          </ul>
        </div>


      </div>

      {/* profile tag */}
      <Link href={"/dashboard/profile"} className='border-slate-800 border-t  p-8 items-center  flex justify-between'>
        <div className='flex items-center  gap-2'>
            <div className='rounded-full w-14 h-14 bg-card flex justify-center items-center border border-primary/20 mr-2 '>
              <User size={26} className='text-primary'/>
            </div>
            <SideProfile />
          </div>
         <Menu />
      </Link>
    </div>
  )
}

export default Sidebar