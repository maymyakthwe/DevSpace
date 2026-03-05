"use client"
import Project from '@/components/Project'
import { projectType } from '@/Types/types'
import {motion} from 'framer-motion'
import { Plus,Search,ListFilter } from 'lucide-react'

export const projects: projectType[] = [
  {
    id: 1,
    name: "DevSpace Dashboard",
    description: "A modern developer dashboard built with Next.js and Tailwind CSS.",
    status: "In Progress",
    techstack: ["Next.js", "TypeScript", "Tailwind CSS"],
    lastUpdated: "2026/03/01",
    progress: 75,
    link: "https://github.com/yourusername/devspace-dashboard",
    active: true,
  },
  {
    id: 2,
    name: "MERN Animal Shelter",
    description: "Full-stack animal adoption platform with admin dashboard.",
    status: "Completed",
    techstack: ["MongoDB", "Express.js", "React", "Node.js"],
    lastUpdated: "2026/02/20",
    progress: 100,
    link: "https://github.com/yourusername/animal-shelter",
    active: false,
  },
  {
    id: 3,
    name: "Portfolio v3",
    description: "Personal portfolio with Framer Motion animations and 3D elements.",
    status: "In Progress",
    techstack: ["Next.js", "Framer Motion", "Three.js"],
    lastUpdated: "2026/02/28",
    progress: 60,
    link: "https://yourportfolio.com",
    active: true,
  },
  {
    id: 4,
    name: "E-commerce Admin Panel",
    description: "Admin panel with analytics, product management and role-based access.",
    status: "Planning",
    techstack: ["React", "Redux", "Node.js", "MySQL"],
    lastUpdated: "2026/03/03",
    progress: 20,
    link: "https://github.com/yourusername/ecommerce-admin",
    active: true,
  },
  {
    id: 5,
    name: "TaskFlow API",
    description: "RESTful API for task management with JWT authentication.",
    status: "Completed",
    techstack: ["Express.js", "TypeScript", "PostgreSQL"],
    lastUpdated: "2026/01/15",
    progress: 100,
    link: "https://github.com/yourusername/taskflow-api",
    active: false,
  },
]


const page = () => {
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

export default page