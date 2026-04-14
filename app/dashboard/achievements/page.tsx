"use client"
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useToken } from '@/lib/auth-route'
import { getProjects } from '@/lib/project-route'
import { getSkills } from '@/lib/skill-route'
import { getUserProfile } from '@/lib/profile-route'
import { projectType, skillType, profileType } from '@/Types/types'

import { Folder, FolderOpen, Layers, Star, Github, Zap, Globe, Trophy, Crown, Link, BookOpen, Eye } from 'lucide-react'

const ACHIEVEMENTS = [
  // Projects
  {
    id: "first_project",
    icon: <Folder size={24} className="text-green-400" />,
    iconBg: "bg-green-900/20",
    title: "Builder",
    description: "Add your first project",
    category: "Projects",
    check: (p: projectType[]) => p.length >= 1,
    progress: (p: projectType[]) => ({ current: Math.min(p.length, 1), total: 1 })
  },
  {
    id: "three_projects",
    icon: <FolderOpen size={24} className="text-blue-400" />,
    iconBg: "bg-blue-900/20",
    title: "Project Trio",
    description: "Add 3 projects",
    category: "Projects",
    check: (p: projectType[]) => p.length >= 3,
    progress: (p: projectType[]) => ({ current: Math.min(p.length, 3), total: 3 })
  },
  {
    id: "ten_projects",
    icon: <Layers size={24} className="text-purple-400" />,
    iconBg: "bg-purple-900/20",
    title: "Prolific",
    description: "Add 10 projects",
    category: "Projects",
    check: (p: projectType[]) => p.length >= 10,
    progress: (p: projectType[]) => ({ current: Math.min(p.length, 10), total: 10 })
  },
  {
    id: "featured",
    icon: <Star size={24} className="text-yellow-400" />,
    iconBg: "bg-yellow-900/20",
    title: "Featured Creator",
    description: "Mark a project as featured",
    category: "Projects",
    check: (p: projectType[]) => p.some(x => x.isfeatured),
    progress: (p: projectType[]) => ({ current: p.some(x => x.isfeatured) ? 1 : 0, total: 1 })
  },
  {
    id: "github_link",
    icon: <Github size={24} className="text-white" />,
    iconBg: "bg-slate-700/40",
    title: "Open Source Hero",
    description: "Add a GitHub link to a project",
    category: "Projects",
    check: (p: projectType[]) => p.some(x => !!x.githubLink),
    progress: (p: projectType[]) => ({ current: p.some(x => !!x.githubLink) ? 1 : 0, total: 1 })
  },
  // Skills
  {
    id: "first_skill",
    icon: <Zap size={24} className="text-yellow-400" />,
    iconBg: "bg-yellow-900/20",
    title: "Skilled",
    description: "Add your first skill",
    category: "Skills",
    check: (_p: projectType[], s: skillType[]) => s.length >= 1,
    progress: (_p: projectType[], s: skillType[]) => ({ current: Math.min(s.length, 1), total: 1 })
  },
  {
    id: "well_rounded",
    icon: <Globe size={24} className="text-teal-400" />,
    iconBg: "bg-teal-900/20",
    title: "Well Rounded",
    description: "Add skills in 3 different categories",
    category: "Skills",
    check: (_p: projectType[], s: skillType[]) => new Set(s.map(x => x.category)).size >= 3,
    progress: (_p: projectType[], s: skillType[]) => ({ current: Math.min(new Set(s.map(x => x.category)).size, 3), total: 3 })
  },
  {
    id: "expert",
    icon: <Crown size={24} className="text-purple-400" />,
    iconBg: "bg-purple-900/20",
    title: "Expert",
    description: "Add an Expert level skill",
    category: "Skills",
    check: (_p: projectType[], s: skillType[]) => s.some(x => x.proficiency === "Expert"),
    progress: (_p: projectType[], s: skillType[]) => ({ current: s.some(x => x.proficiency === "Expert") ? 1 : 0, total: 1 })
  },
  {
    id: "top_talent",
    icon: <Trophy size={24} className="text-orange-400" />,
    iconBg: "bg-orange-900/20",
    title: "Top Talent",
    description: "Mark 5 skills as top skills",
    category: "Skills",
    check: (_p: projectType[], s: skillType[]) => s.filter(x => x.isTopSkill).length >= 5,
    progress: (_p: projectType[], s: skillType[]) => ({ current: Math.min(s.filter(x => x.isTopSkill).length, 5), total: 5 })
  },
  // Profile
  {
    id: "connected",
    icon: <Link size={24} className="text-blue-400" />,
    iconBg: "bg-blue-900/20",
    title: "Connected",
    description: "Add GitHub, LinkedIn and Twitter",
    category: "Profile",
    check: (_p: projectType[], _s: skillType[], prof: profileType) => !!(prof?.github && prof?.linkedin && prof?.twitter),
    progress: (_p: projectType[], _s: skillType[], prof: profileType) => ({ current: [prof?.github, prof?.linkedin, prof?.twitter].filter(Boolean).length, total: 3 })
  },
  {
    id: "storyteller",
    icon: <BookOpen size={24} className="text-pink-400" />,
    iconBg: "bg-pink-900/20",
    title: "Storyteller",
    description: "Fill in your About section",
    category: "Profile",
    check: (_p: projectType[], _s: skillType[], prof: profileType) => !!(prof?.about && prof.about.length > 10),
    progress: (_p: projectType[], _s: skillType[], prof: profileType) => ({ current: prof?.about?.length > 10 ? 1 : 0, total: 1 })
  },
  {
    id: "public",
    icon: <Eye size={24} className="text-green-400" />,
    iconBg: "bg-green-900/20",
    title: "In the Spotlight",
    description: "Make your profile public",
    category: "Profile",
    check: (_p: projectType[], _s: skillType[], prof: profileType) => prof?.public === true,
    progress: (_p: projectType[], _s: skillType[], prof: profileType) => ({ current: prof?.public ? 1 : 0, total: 1 })
  },
]

const CATEGORIES = ["All", "Projects", "Skills", "Profile"]

export default function AchievementsPage() {
    const token = useToken()
    const [projects, setProjects] = useState<projectType[]>([])
    const [skills, setSkills] = useState<skillType[]>([])
    const [profile, setProfile] = useState<profileType | null>(null)
    const [filter, setFilter] = useState("All")

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

    const filtered = ACHIEVEMENTS.filter(a => filter === "All" || a.category === filter)
    const unlocked = profile ? ACHIEVEMENTS.filter(a => a.check(projects, skills, profile)) : []



    return (
        <div className="p-10 text-off-white-1 min-h-full">

        {/* Header */}
        <div className="flex justify-between items-start mb-10">
            <div>
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold mb-3">Achievements</motion.h1>
            <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-off-white-2">Complete challenges to unlock achievements and showcase your progress.</motion.p>
            </div>
            <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-slate-700/50 rounded-2xl px-6 py-4 text-center">
            <p className="text-3xl font-bold text-primary">{unlocked.length}<span className="text-off-white-2 text-lg font-normal">/{ACHIEVEMENTS.length}</span></p>
            <p className="text-xs text-off-white-2 mt-1">Unlocked</p>
            </motion.div>
        </div>

        {/* Progress bar */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-slate-700/50 rounded-2xl p-6 mb-8">
            <div className="flex justify-between text-sm mb-3">
            <span className="text-off-white-2">Overall Progress</span>
            <span className="text-primary font-medium">{Math.round((unlocked.length / ACHIEVEMENTS.length) * 100)}%</span>
            </div>
            <div className="w-full bg-slate-700/30 rounded-full h-3">
            <div
                className="h-3 rounded-full bg-primary transition-all duration-700"
                style={{ width: `${Math.round((unlocked.length / ACHIEVEMENTS.length) * 100)}%` }}
            />
            </div>
        </motion.div>


        {/* Filter tabs */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex gap-2 mb-8">
            {CATEGORIES.map(cat => (
            <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-xl text-sm transition duration-200 border ${filter === cat
                ? "bg-primary text-white border-primary"
                : "border-slate-700/50 text-off-white-2 hover:border-primary/50"
                }`}>
                {cat}
            </button>
            ))}
        </motion.div>



        {/* Achievement grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((achievement, index) => {
            const isUnlocked = profile ? achievement.check(projects, skills, profile) : false
            const prog = profile ? achievement.progress(projects, skills, profile) : { current: 0, total: 1 }
            const progressPct = Math.round((prog.current / prog.total) * 100)

            return (
                <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index % 3 * 0.1 }}
                className={`bg-card border rounded-2xl p-6 flex flex-col gap-4 transition duration-300 ${isUnlocked
                    ? "border-primary/40 shadow-sm shadow-primary/10"
                    : "border-slate-700/50 opacity-60"
                    }`}>

                {/* Icon + title */}
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                    <div className={`text-3xl p-3 rounded-xl ${isUnlocked ? "bg-primary/10" : "bg-slate-700/20"}`}>
                        {achievement.icon}
                    </div>
                    <div>
                        <h3 className="font-semibold text-off-white-1">{achievement.title}</h3>
                        <span className="text-xs text-off-white-2/60">{achievement.category}</span>
                    </div>
                    </div>
                    {isUnlocked && (
                    <span className="text-xs text-green-400 bg-green-900/20 border border-green-500/20 px-2 py-1 rounded-full">
                        ✓ Unlocked
                    </span>
                    )}
                </div>

                {/* Description */}
                <p className="text-sm text-off-white-2">{achievement.description}</p>


                {/* Progress */}
                {!isUnlocked && (
                <div>
                    <div className="flex justify-between text-xs text-off-white-2/60 mb-1">
                        <span>Progress</span>
                        <span>{prog.current}/{prog.total}</span>
                    </div>
                    <div className="w-full bg-slate-700/30 rounded-full h-1.5">
                        <div
                        className="h-1.5 rounded-full bg-primary/50 transition-all duration-500"
                        style={{ width: `${progressPct}%` }}
                        />
                    </div>
                    <p className="text-xs text-off-white-2/50 mt-2">
                        {prog.current === 0
                        ? achievement.description
                        : `${prog.total - prog.current} more to go`}
                    </p>
                    </div>
                )}

                </motion.div>
            )
            })}
        </div>
        </div>
    )
    }