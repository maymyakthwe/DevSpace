"use client"

import Link from "next/link";
import { usePathname } from "next/navigation"

type Props = {
    name: string;
    icon: React.ReactNode;
    href: string;
}

const SideComponent = (props: Props) => {
  const pathname = usePathname()
  const isActive = pathname === props.href
  return (
    <Link href={props.href} className={`flex items-center gap-3 rounded-2xl p-4 text-off-white-2 cursor-pointer transition duration-300  ${isActive ? 'bg-primary shadow-md shadow-slate-800 text-white' : 'hover:bg-[#fff1] hover:text-white'}`}>
      {props.icon}
      <span>{props.name}</span>
    </Link>
  )
}

export default SideComponent