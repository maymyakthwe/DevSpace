import { projectType } from '@/Types/types';
import{Calendar,ExternalLink} from 'lucide-react'
import React from 'react'

type Props = {
    project: projectType;
}

const Project = ({project}: Props) => {
  return (
    <div className="group bg-card border border-slate-700/50 rounded-2xl p-6 hover:border-primary transition duration-300 cursor-pointer min-h-90 flex flex-col justify-between">
      {/* heading & description */}
      <div>
        <div className='flex items-start justify-between mb-6'>
          <h2 className="text-xl font-semibold ">{project.name}</h2>
          {project.active && <div className="text-xs text-green-500 font-medium bg-green-900/20 rounded-xl py-1 px-2">Active</div>}
        </div>
        <p className="text-sm text-off-white-2 mb-4">{project.description}</p>
      </div>
      {/* tech stack */}
      <div>
          
          {project.techstack.map((tech,index) => (
            <span key={index} className="text-xs text-off-white-2 bg-slate-700/25 rounded-full py-2 px-3 mr-2 mb-2 inline-block">{tech}</span>
          ))}
          {/* line */}
        
      </div>
      <div>
        <div className="border-t border-slate-600/30 my-4 "></div>
        <div className="flex items-center justify-between">
          <div className="text-sm text-off-white-2 flex items-center"> 
            <Calendar size={20} className='mr-2'/>
            <div>{project.lastUpdated}</div>
          </div>
          <a href={project.link} target="_blank" className="text-sm text-primary hover:underline">
            <ExternalLink size={20}/>
          </a>
          </div>
      </div>
     
    </div>
  )
}

export default Project