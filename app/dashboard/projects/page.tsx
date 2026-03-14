"use client"
import Project from '@/components/Project'
import { getProjects } from '@/lib/project-route'
import { projectType } from '@/Types/types'
import {motion} from 'framer-motion'
import { Plus,Search,ListFilter } from 'lucide-react'
import { useEffect, useState } from 'react'



const Page =  () => {

  const [projects,setProjects]= useState<projectType[]>([])

  useEffect(()=>{
    const fetchProjects = async()=>{
      const data = await getProjects()
      setProjects(data)
    }
    fetchProjects()
  },[])

  console.log(projects)

  return (
    <div className=" p-10 text-off-white-1  min-h-full ">
      {/* header */}
      <div  className='flex justify-between items-center'>
        <div >
          <motion.h1 
          initial={{opacity: 0,y:-20}} 
          animate={{opacity: 1,y:0}} 
          className="text-4xl font-bold mb-3">Projects</motion.h1>
          <motion.p
          initial={{opacity:0,y:-20}}
          animate={{opacity: 1,y:0}}
          transition={{ delay: 0.1 }} className="text-off-white-2">Manage and track your development projects.</motion.p>
        </div>
         <motion.div 
          initial={{opacity:0,y:-20}}
          animate={{opacity: 1,y:0}}
          transition={{ delay: 0.1 }} 
          className=" p-3 bg-primary rounded-lg flex items-center gap-2 cursor-pointer hover:bg-primary/90 transition duration-100 text-white">
          <Plus  size={24}/>
          New Project
        </motion.div>
      </div>

      {/* #filter */}
      <motion.div
          initial={{opacity:0,y:20}}
          animate={{opacity: 1,y:0}}
          transition={{ delay: 0.2 }} 
          className='text-sm flex items-center gap-4'>
            <div className='border border-slate-700 rounded-2xl mt-6   bg-card w-[45%] flex items-center  focus-within:border-primary focus-within:border-2 focus-within:ring-1 focus-within:ring-primary transition duration-300'>
              <Search size={20} className='text-off-white-2 m-3'/>
              <input type="text" className='w-full h-full p-3 outline-none' placeholder="Search..."/>
            </div>
            <div className='border border-slate-700 rounded-2xl mt-6 p-3 gap-3  w-25 flex items-center hover:border-primary  transition duration-300 cursor-pointer'>
              <ListFilter size={20} className='text-off-white-2'/>
              Filter
            </div>
      </motion.div>

      {/* project cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {projects.map((project,index) => (
          <motion.div  
                  key={index}
                  initial={{opacity:0,y:20}}
                  animate={{opacity:1,y:0}}
                  transition={{delay:index%3*0.1}} 
                  >

           <Project project={project}/>
          
          </motion.div>          
        ))}
      </div>
    </div>
  )
}

export default Page