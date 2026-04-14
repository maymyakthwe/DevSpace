"use client"
import Skill from '@/components/Skill'
import { useToken } from '@/lib/auth-route'
import { createSkill, deleteSkill, getSkills, updateSkill } from '@/lib/skill-route'
import { getProjects } from '@/lib/project-route'
import { skillType, projectType } from '@/Types/types'
import { motion } from 'framer-motion'
import { Plus, Search } from 'lucide-react'
import { useEffect, useState } from 'react'

const initialSkillData: skillType = {
  name: "",
  category: "",
  proficiency: "",
  yearsOfExperience: 0,
  projectRefs: [],
  isTopSkill: false,
  icon: "",
}

const Page = () => {
  const token = useToken()
  const [skills, setSkills] = useState<skillType[]>([])
  const [projects, setProjects] = useState<projectType[]>([])
  const [popupForm, setPopupForm] = useState(false)
  const [data, setData] = useState<skillType>(initialSkillData)
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null)
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (!token) return
    const fetch_ = async () => {
      const [s, p] = await Promise.all([getSkills(token), getProjects(token)])
      setSkills(s)
      setProjects(p)
    }
    fetch_()
  }, [token])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (editingSkillId) {
        const updated = await updateSkill(editingSkillId, data, token)
        setSkills(prev => prev.map(s => s._id === editingSkillId ? updated : s))
      } else {
        const result = await createSkill(data, token)
        setSkills(prev => [result, ...prev])
      }
      closeModal()
    } catch (error) {
      console.error("Skill save failed:", error)
    }
  }

  const handleEdit = (skill: skillType) => {
    setEditingSkillId(skill._id ?? null)
    setData({ ...skill })
    setPopupForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this skill?")) return
    try {
      await deleteSkill(id, token)
      setSkills(prev => prev.filter(s => s._id !== id))
    } catch (error) {
      console.error("Skill delete failed:", error)
    }
  }

  const closeModal = () => {
    setPopupForm(false)
    setEditingSkillId(null)
    setData(initialSkillData)
  }

  const toggleProjectRef = (projectId: string) => {
    setData(prev => ({
      ...prev,
      projectRefs: prev.projectRefs.includes(projectId)
        ? prev.projectRefs.filter(id => id !== projectId)
        : [...prev.projectRefs, projectId]
    }))
  }

  const filtered = skills.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  )

  // Group by category
  const grouped = filtered.reduce((acc, skill) => {
    const cat = skill.category || "Other"
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(skill)
    return acc
  }, {} as Record<string, skillType[]>)

  return (
    <div className="p-10 text-off-white-1 min-h-full relative">

      {/* Header */}
      <div className='flex justify-between items-center'>
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-3">Skills</motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-off-white-2">Manage your skills and link them to your projects.</motion.p>
        </div>
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-3 bg-primary rounded-lg flex items-center gap-2 cursor-pointer hover:bg-primary/90 transition duration-100 text-white"
          onClick={() => setPopupForm(true)}>
          <Plus size={24} />
          New Skill
        </motion.button>
      </div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className='text-sm flex items-center gap-4'>
        <div className='border border-slate-700 rounded-2xl mt-6 bg-card w-[45%] flex items-center focus-within:border-primary focus-within:border-2 focus-within:ring-1 focus-within:ring-primary transition duration-300'>
          <Search size={20} className='text-off-white-2 m-3' />
          <input
            type="text"
            className='w-full h-full p-3 outline-none'
            placeholder="Search skills..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </motion.div>

      {/* Skills grouped by category */}
      <div className="mt-8 flex flex-col gap-8">
        {Object.entries(grouped).map(([category, categorySkills]) => (
          <div key={category}>
            <h3 className="text-sm font-medium text-off-white-2/70 uppercase tracking-wider mb-4">{category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categorySkills.map((skill, index) => (
                <motion.div
                  key={skill._id ?? index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index % 3 * 0.1 }}>
                  <Skill
                    skill={skill}
                    projects={projects}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Popup Form */}
      {popupForm && (
        <form onSubmit={handleSubmit} className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-2xl max-h-[90vh] bg-[#0b1627] rounded-2xl border border-gray-800 flex flex-col">

            {/* Header */}
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-xl font-semibold text-white">
                {editingSkillId ? "Edit Skill" : "Add New Skill"}
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                {editingSkillId ? "Update your skill details" : "Add a skill and link it to your projects"}
              </p>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">

              {/* Name + Icon */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-300">Skill Name</label>
                  <input
                    className="w-full mt-2 rounded-xl bg-[#111f36] border border-gray-800 px-4 py-3 text-gray-200 outline-none focus:border-primary"
                    placeholder="React"
                    value={data.name}
                    onChange={e => setData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-300">Icon slug <span className="text-gray-500">(from devicon)</span></label>
                  <input
                    className="w-full mt-2 rounded-xl bg-[#111f36] border border-gray-800 px-4 py-3 text-gray-200 outline-none focus:border-primary"
                    placeholder="react"
                    value={data.icon}
                    onChange={e => setData(prev => ({ ...prev, icon: e.target.value }))}
                  />
                </div>
              </div>

              {/* Category + Proficiency */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-300">Category</label>
                  <select
                    className="w-full mt-2 rounded-xl bg-[#111f36] border border-gray-800 px-4 py-3 text-gray-200 outline-none focus:border-primary"
                    value={data.category}
                    onChange={e => setData(prev => ({ ...prev, category: e.target.value }))}
                  >
                    <option value="">Select category</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Database">Database</option>
                    <option value="Language">Language</option>
                    <option value="Tool">Tool</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-300">Proficiency</label>
                  <select
                    className="w-full mt-2 rounded-xl bg-[#111f36] border border-gray-800 px-4 py-3 text-gray-200 outline-none focus:border-primary"
                    value={data.proficiency}
                    onChange={e => setData(prev => ({ ...prev, proficiency: e.target.value }))}
                  >
                    <option value="">Select proficiency</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
              </div>

              {/* Years of Experience */}
              <div>
                <label className="text-sm text-gray-300">Years of Experience: <span className="text-primary">{data.yearsOfExperience}</span></label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="0.5"
                  className="w-full mt-2 accent-primary"
                  value={data.yearsOfExperience}
                  onChange={e => setData(prev => ({ ...prev, yearsOfExperience: parseFloat(e.target.value) }))}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0</span>
                  <span>20 years</span>
                </div>
              </div>

              {/* Link to Projects */}
              <div>
                <label className="text-sm text-gray-300 mb-2 block">Link to Projects</label>
                {projects.length === 0 ? (
                  <p className="text-xs text-gray-500">No projects yet. Add projects first.</p>
                ) : (
                  <div className="flex flex-col gap-2">
                    {projects.map(project => (
                      <label key={project._id} className="flex items-center gap-3 cursor-pointer p-3 rounded-xl bg-[#111f36] border border-gray-800 hover:border-primary/50 transition">
                        <input
                          type="checkbox"
                          className="accent-primary w-4 h-4"
                          checked={data.projectRefs.includes(project._id ?? "")}
                          onChange={() => toggleProjectRef(project._id ?? "")}
                        />
                        <div>
                          <p className="text-sm text-gray-200">{project.name}</p>
                          {project.category && (
                            <p className="text-xs text-gray-500">{project.category} · {project.type}</p>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Top Skill toggle */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-primary"
                  checked={data.isTopSkill}
                  onChange={e => setData(prev => ({ ...prev, isTopSkill: e.target.checked }))}
                />
                <span className="text-sm text-gray-300">Mark as Top Skill <span className="text-gray-500">(shows on public profile)</span></span>
              </label>

            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-800 flex justify-end gap-4">
              <button
                type="button"
                onClick={closeModal}
                className="px-6 py-3 rounded-xl border border-gray-700 text-gray-300 hover:bg-gray-800">
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium">
                {editingSkillId ? "Save Changes" : "Add Skill"}
              </button>
            </div>

          </div>
        </form>
      )}

    </div>
  )
}

export default Page