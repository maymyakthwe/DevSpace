import { skillType, projectType } from '@/Types/types'
import { Pencil, Trash2 } from 'lucide-react'
import Image from 'next/image'

type Props = {
  skill: skillType
  projects: projectType[]
  onEdit: (skill: skillType) => void
  onDelete: (id: string) => void
}

const proficiencyLevel: Record<string, number> = {
  "Beginner": 25,
  "Intermediate": 50,
  "Advanced": 75,
  "Expert": 100,
}

const proficiencyColor: Record<string, string> = {
  "Beginner": "bg-blue-500",
  "Intermediate": "bg-yellow-500",
  "Advanced": "bg-primary",
  "Expert": "bg-green-500",
}

const categoryColor: Record<string, string> = {
  "Frontend": "text-blue-400 bg-blue-900/20 border-blue-500/20",
  "Backend": "text-green-400 bg-green-900/20 border-green-500/20",
  "DevOps": "text-orange-400 bg-orange-900/20 border-orange-500/20",
  "Database": "text-yellow-400 bg-yellow-900/20 border-yellow-500/20",
  "Language": "text-purple-400 bg-purple-900/20 border-purple-500/20",
  "Tool": "text-pink-400 bg-pink-900/20 border-pink-500/20",
  "Other": "text-off-white-2 bg-slate-700/20 border-slate-600/20",
}

const Skill = ({ skill, projects, onEdit, onDelete }: Props) => {
  const referencedProjects = projects.filter(p =>
    p._id && (skill.projectRefs ?? []).includes(p._id)
  )

  const level = proficiencyLevel[skill.proficiency] ?? 50
  const barColor = proficiencyColor[skill.proficiency] ?? "bg-primary"
  const catStyle = categoryColor[skill.category] ?? categoryColor["Other"]

  return (
    <div className="group bg-card border border-slate-700/50 rounded-2xl p-6 hover:border-primary transition duration-300 flex flex-col gap-4">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {skill.icon && (
            <Image
                src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}/${skill.icon}-original.svg`}
                alt={skill.name}
                className="w-8 h-8"
                width={32}
                height={32}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
          )}
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base font-semibold text-off-white-1">{skill.name}</h2>
              {skill.isTopSkill && (
                <span className="text-xs text-yellow-400 bg-yellow-900/20 border border-yellow-500/20 rounded-full px-2 py-0.5">
                  ★ Top Skill
                </span>
              )}
            </div>
            <span className={`text-xs border rounded-full px-2 py-0.5 mt-1 inline-block ${catStyle}`}>
              {skill.category}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onEdit(skill)}
            className="text-off-white-2 hover:text-primary transition"
          >
            <Pencil size={16} />
          </button>
          {skill._id && (
            <button
              type="button"
              onClick={() => onDelete(skill._id!)}
              className="text-off-white-2 hover:text-red-400 transition"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Proficiency bar */}
      <div>
        <div className="flex justify-between text-xs text-off-white-2 mb-1">
          <span>{skill.proficiency}</span>
          <span>{skill.yearsOfExperience} {skill.yearsOfExperience === 1 ? "year" : "years"}</span>
        </div>
        <div className="w-full bg-slate-700/30 rounded-full h-1.5">
          <div
            className={`h-1.5 rounded-full ${barColor} transition-all duration-500`}
            style={{ width: `${level}%` }}
          />
        </div>
      </div>

      {/* Referenced Projects */}
      {referencedProjects.length > 0 && (
        <div>
          <p className="text-xs text-off-white-2/60 mb-2">Used in</p>
          <div className="flex flex-wrap gap-2">
            {referencedProjects.map(p => (
              <span key={p._id} className="text-xs text-off-white-2 bg-slate-700/25 border border-slate-600/30 rounded-full px-3 py-1">
                {p.name}
              </span>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}

export default Skill