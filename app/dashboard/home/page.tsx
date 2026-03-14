"use client"
import StatsComponent from '@/components/StatsComponent'
import { statsType } from '@/Types/types'
import {motion } from 'framer-motion'
import {Folder,Award,TrendingUp,Eye} from 'lucide-react'


const stats:statsType[] =[
  {
    total:24,
    icon:<Folder size={30}/>,
    label:"Total Projects",
    change:"+12%",
    color:"green",
  },
  {
    total:24,
    icon:<Award size={30}/>,
    label:"Skills Tracked",
    change:"+12%",
    color:"blue",
  },
  {
    total:24,
    icon:<TrendingUp size={30}/>,
    label:"Total Projects",
    change:"+12%",
    color:"purple",
  },
  {
    total:24,
    icon:<Eye size={30}/>,
    label:"Total Projects",
    change:"+12%",
    color:"orange",
  }
]


const page = () => {
  return (
    <div className=" p-10 text-off-white-1  min-h-full ">
      {/* header */}
      <div>
        <motion.h1 
        initial={{opacity: 0,y:-20}} 
        animate={{opacity: 1,y:0}} 
        className="text-4xl font-bold mb-3">Dashboard</motion.h1>
        <motion.p
        initial={{opacity:0,y:-20}}
        animate={{opacity: 1,y:0}}
        transition={{ delay: 0.1 }} className="text-off-white-2">Welcome to your dashboard! Here&apos;s your developer overview.</motion.p>
      </div>

      {/* progress */}
      <div className="grid grid-cols-4 gap-6 mt-10">
        {stats.map((stat,index)=>(
          <motion.div
                  key={index}
                  initial={{opacity:0,y:20}}
                  animate={{opacity:1,y:0}}
                  transition={{delay:index*0.1}}>
                    <StatsComponent stat={stat}/>
                  </motion.div>
        ))}
      </div>
    </div>
  )
}

export default page