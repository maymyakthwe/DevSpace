import { projectType } from '@/Types/types';
import{Calendar,ExternalLink,Pencil,Trash2} from 'lucide-react'
import React from 'react'

type Props = {
    project: projectType;
    onEdit: (project: projectType) => void;
    onDelete: (id: string) => void;
}

const Project = ({project, onEdit, onDelete}: Props) => {
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
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onEdit(project)}
              className="text-off-white-2 hover:text-primary transition"
            >
              <Pencil size={18}/>
            </button>
            {project._id && (
              <button
                type="button"
                onClick={() => onDelete(project._id!)}
                className="text-off-white-2 hover:text-red-400 transition"
              >
                <Trash2 size={18}/>
              </button>
            )}
            <a href={project.link} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline">
              <ExternalLink size={20}/>
            </a>
          </div>
          </div>
      </div>
     
    </div>
  )
}

export default Project
