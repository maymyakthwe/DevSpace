import { projectType } from '@/Types/types';
import { Calendar, ExternalLink, Pencil, Trash2, Github, Users, GitCommit } from 'lucide-react'
import React from 'react'

type Props = {
    project: projectType;
    onEdit: (project: projectType) => void;
    onDelete: (id: string) => void;
}

const statusStyles: Record<string, string> = {
  "Active": "text-green-500 bg-green-900/20",
  "Completed": "text-primary bg-primary/10",
  "In Progress": "text-yellow-500 bg-yellow-900/20",
  "On Hold": "text-orange-400 bg-orange-900/20",
  "Archived": "text-off-white-2 bg-slate-700/20",
}

const truncate = (text: string, wordLimit: number) => {
  const words = text.split(" ")
  if (words.length <= wordLimit) return text
  return words.slice(0, wordLimit).join(" ") + "..."
}

const Project = ({ project, onEdit, onDelete }: Props) => {
  return (
    <div className="group bg-card border border-slate-700/50 rounded-2xl p-6 hover:border-primary transition duration-300 cursor-pointer flex flex-col justify-between gap-4">

      {/* Top — name, category, type, status, featured */}
      <div>
        <div className='flex items-start justify-between mb-2'>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h2 className="text-lg font-semibold text-off-white-1">{project.name}</h2>
              {project.isfeatured && (
                <span className="text-xs text-yellow-400 bg-yellow-900/20 border border-yellow-500/20 rounded-full px-2 py-0.5">
                  ★ Featured
                </span>
              )}
            </div>
            {(project.category || project.type) && (
              <p className="text-xs text-off-white-2/70">
                {[project.category, project.type].filter(Boolean).join(" · ")}
              </p>
            )}
          </div>
          {project.status && (
            <span className={`text-xs font-medium rounded-xl py-1 px-2 whitespace-nowrap ml-2 ${statusStyles[project.status] ?? "text-off-white-2 bg-slate-700/20"}`}>
              {project.status}
            </span>
          )}
        </div>

        <p className="text-sm text-off-white-2 mt-3 leading-relaxed">
          {truncate(project.description, 20)}
        </p>
      </div>

      {/* Tech stack */}
      {project.techstack.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {project.techstack.map((tech, index) => (
            <span key={index} className="text-xs text-off-white-2 bg-slate-700/25 rounded-full py-1 px-3">
              {tech}
            </span>
          ))}
        </div>
      )}

      {/* Tags */}
      {project.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, index) => (
            <span key={index} className="text-xs text-primary/70 bg-primary/10 rounded-full py-1 px-3">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Highlights */}
      {project.highlights.length > 0 && (
        <ul className="flex flex-col gap-1">
          {project.highlights.map((h, i) => (
            <li key={i} className="text-xs text-off-white-2 flex items-start gap-2">
              <span className="text-primary mt-0.5">→</span>
              {h}
            </li>
          ))}
        </ul>
      )}

      {/* Stats row */}
      <div className="flex flex-wrap gap-4 text-xs text-off-white-2/70">
        {project.commits > 0 && (
          <span className="flex items-center gap-1">
            <GitCommit size={13} />
            {project.commits} commits
          </span>
        )}
        {project.collaborators.length > 0 && (
          <span className="flex items-center gap-1">
            <Users size={13} />
            {project.collaborators.length} collaborator{project.collaborators.length > 1 ? "s" : ""}
          </span>
        )}
        {(project.startDate || project.endDate) && (
          <span className="flex items-center gap-1">
            <Calendar size={13} />
            {project.startDate || "?"} → {project.endDate || "Present"}
          </span>
        )}
      </div>

      {/* Footer — actions */}
      <div>
        <div className="border-t border-slate-600/30 mb-4"></div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onEdit(project)}
              className="text-off-white-2 hover:text-primary transition"
            >
              <Pencil size={17} />
            </button>
            {project._id && (
              <button
                type="button"
                onClick={() => onDelete(project._id!)}
                className="text-off-white-2 hover:text-red-400 transition"
              >
                <Trash2 size={17} />
              </button>
            )}
          </div>
          <div className="flex items-center gap-3">
            {project.githubLink && (
              <a href={project.githubLink} target="_blank" rel="noreferrer" className="text-off-white-2 hover:text-primary transition">
                <Github size={18} />
              </a>
            )}
            {project.link && (
              <a href={project.link} target="_blank" rel="noreferrer" className="text-off-white-2 hover:text-primary transition">
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Project