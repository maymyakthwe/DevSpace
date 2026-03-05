import { statsType } from '@/Types/types'
import React from 'react'

type Props = {
    stat:statsType
}

const StatsComponent = (props: Props) => {
  return (
    <div className='p-8 border border-slate-800 rounded-2xl hover:border-primary/50 transition duration-300 bg-card h-60 flex flex-col justify-between'>
        <div className='flex  justify-between items-start'>
          <div className='text-primary p-3 bg-slate-800 rounded-2xl'>
            {props.stat.icon}
          </div>
          <div className={`${props.stat.color === "green" && "bg-[#112a29] text-[#05df67]"}
          ${props.stat.color === "blue" && "bg-[#05a1df20] text-[#05a1df]"}
          ${props.stat.color === "purple" && "bg-[#7c0ae020] text-[#b270eb]"}
          ${props.stat.color === "orange" && "bg-[#df6e0520] text-[#df6e05]"} py-2 px-4 rounded-full text-xs flex items-center`}>
            {props.stat.change}
          </div>
        </div>

        <div className=''>
          <div className='text-2xl font-bold mb-2'>{props.stat.total}</div>
          <div className='text-off-white-2'>{props.stat.label}</div>
        </div>
    </div>
  )
}

export default StatsComponent