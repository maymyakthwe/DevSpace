"use client"
import StatsComponent from '@/components/StatsComponent'
import { statsType, projectType, skillType, profileType } from '@/Types/types'
import { motion } from 'framer-motion'
import { Folder, Award, Star, GitCommit, Plus, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useToken } from '@/lib/auth-route'
import { getProjects } from '@/lib/project-route'
import { getSkills } from '@/lib/skill-route'
import { getUserProfile } from '@/lib/profile-route'
import Link from 'next/link'
import Image from 'next/image'

const Page = () => {
  const token = useToken()
  const [projects, setProjects] = useState<projectType[]>([])
  const [skills, setSkills] = useState<skillType[]>([])
  const [profile, setProfile] = useState<profileType | null>(null)

  useEffect(() => {
    if (!token) return
    const fetchAll = async () => {
      const [p, s, prof] = await Promise.all([
        getProjects(token),
        getSkills(token),
        getUserProfile(token),
      ])
      setProjects(p)
      setSkills(s)
      setProfile(prof)
    }
    fetchAll()
  }, [token])

  const completedProjects = projects.filter(p => p.active === true).length
  const totalCommits = projects.reduce((acc, p) => acc + (p.commits ?? 0), 0)

  const stats: statsType[] = [
    { total: projects.length, icon: <Folder size={30} />, label: "Total Projects", change: `${completedProjects} completed`, color: "green" },
    { total: skills.length, icon: <Award size={30} />, label: "Skills Tracked", change: `${skills.filter(s => s.isTopSkill).length} top skills`, color: "blue" },
    { total: completedProjects, icon: <Star size={30} />, label: "Active Projects", change: `${projects.filter(p => p.status === "Active").length} active`, color: "purple" },
    { total: totalCommits, icon: <GitCommit size={30} />, label: "Total Commits", change: "across all projects", color: "orange" },
  ]

  return (
    <div className="p-10 text-off-white-1 min-h-full">

      {/* Header */}
      <div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-3">Dashboard</motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-off-white-2">
          Welcome back{profile?.fullname ? `, ${profile.fullname.split(" ")[0]}` : ""}!
        </motion.p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mt-10">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}>
            <StatsComponent stat={stat} />
          </motion.div>
        ))}
      </div>



      <div className="grid grid-cols-2 gap-6 mt-6">

        {/* Recent Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card border border-slate-700/50 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-semibold">Recent Projects</h3>
            <Link href="/dashboard/projects" className="text-xs text-primary flex items-center gap-1">
              View all <ChevronRight size={14} />
            </Link>
          </div>
          {projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 gap-3">
              <p className="text-off-white-2 text-sm">No projects yet</p>
              <Link href="/dashboard/projects" className="flex items-center gap-2 text-xs bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition">
                <Plus size={14} /> Add your first project
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {projects.slice(0, 4).map((project, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-background-2 rounded-xl border border-slate-700/40">
                  <div>
                    <p className="text-sm font-medium text-off-white-1">{project.name}</p>
                    <p className="text-xs text-off-white-2 mt-0.5">{project.category} · {project.type}</p>
                  </div>
                  <span className="text-xs text-off-white-2 bg-slate-700/30 px-3 py-1 rounded-full">
                    {project.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Top Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-card border border-slate-700/50 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-semibold">Top Skills</h3>
            <Link href="/dashboard/skills" className="text-xs text-primary flex items-center gap-1">
              View all <ChevronRight size={14} />
            </Link>
          </div>

          
          {skills.filter(s => s.isTopSkill).length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 gap-3">
              <p className="text-off-white-2 text-sm">No top skills yet</p>
              <Link href="/dashboard/skills" className="flex items-center gap-2 text-xs bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition">
                <Plus size={14} /> Add your first skill
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {skills.filter(s => s.isTopSkill).slice(0, 4).map((skill, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-background-2 rounded-xl border border-slate-700/40">
                  {skill.icon ? (
                    <Image
                      src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}/${skill.icon}-original.svg`}
                      alt={skill.name}
                      width={20}
                      height={20}
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                    />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-xs text-primary">{skill.name[0]}</span>
                    </div>
                  )}

                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-off-white-1">{skill.name}</span>
                      <span className="text-off-white-2/60">{skill.proficiency}</span>
                    </div>
                    <div className="w-full bg-slate-700/30 rounded-full h-1">
                      <div
                        className="h-1 rounded-full bg-primary"
                        style={{ width: `${({ Beginner: 25, Intermediate: 50, Advanced: 75, Expert: 100 } as Record<string, number>)[skill.proficiency] ?? 50}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </motion.div>

      </div>
    </div>
  )
}

export default Page