"use client"
import Project from '@/components/Project'
import TagInput from '@/components/TagInput'
import { useToken } from '@/lib/auth-route'
import { createProject, deleteProject, getProjects, updateProject } from '@/lib/project-route'
import { projectType } from '@/Types/types'
import { motion } from 'framer-motion'
import { Plus, Search, ListFilter } from 'lucide-react'
import { useEffect, useState } from 'react'

const initialProjectData: projectType = {
  name: "",
  description: "",
  techstack: [],
  collaborators: [],
  commits: 0,
  category: "",
  type: "",
  githubLink: "",
  highlights: [],
  isfeatured: false,
  tags: [],
  link: "",
  active: false,
  startDate: "",
  endDate: "",
  status: "",
}

const Page = () => {
  const token = useToken()
  const [projects, setProjects] = useState<projectType[]>([])
  const [popupForm, setPopupForm] = useState<boolean>(false)
  const [data, setData] = useState<projectType>(initialProjectData)
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (editingProjectId) {
        const updatedProject = await updateProject(editingProjectId, data, token)
        setProjects(prev =>
          prev.map(project => project._id === editingProjectId ? updatedProject : project)
        )
      } else {
        const result = await createProject(data, token)
        setProjects(prev => [result, ...prev])
      }
      setPopupForm(false)
      setEditingProjectId(null)
      setData(initialProjectData)
    } catch (error) {
      console.error("Project save failed:", error)
    }
  }

  const openCreateModal = () => {
    setEditingProjectId(null)
    setData(initialProjectData)
    setPopupForm(true)
  }

  const handleEdit = (project: projectType) => {
    setEditingProjectId(project._id ?? null)
    setData({ ...project })
    setPopupForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return
    try {
      await deleteProject(id, token)
      setProjects(prev => prev.filter(project => project._id !== id))
    } catch (error) {
      console.error("Project delete failed:", error)
    }
  }

  const closeModal = () => {
    setPopupForm(false)
    setEditingProjectId(null)
    setData(initialProjectData)
  }

  useEffect(() => {
    if (!token) return
    const fetchProjects = async () => {
      const data = await getProjects(token)
      setProjects(data)
    }
    fetchProjects()
  }, [token])

  return (
    <div className="p-10 text-off-white-1 min-h-full relative">

      {/* Header */}
      <div className='flex justify-between items-center'>
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-3">Projects</motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-off-white-2">Manage and track your development projects.</motion.p>
        </div>
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-3 bg-primary rounded-lg flex items-center gap-2 cursor-pointer hover:bg-primary/90 transition duration-100 text-white active:bg-white active:text-primary"
          onClick={openCreateModal}>
          <Plus size={24} />
          New Project
        </motion.button>
      </div>

      {/* Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className='text-sm flex items-center gap-4'>
        <div className='border border-slate-700 rounded-2xl mt-6 bg-card w-[45%] flex items-center focus-within:border-primary focus-within:border-2 focus-within:ring-1 focus-within:ring-primary transition duration-300'>
          <Search size={20} className='text-off-white-2 m-3' />
          <input type="text" className='w-full h-full p-3 outline-none' placeholder="Search..." />
        </div>
        <div className='border border-slate-700 rounded-2xl mt-6 p-3 gap-3 w-25 flex items-center hover:border-primary transition duration-300 cursor-pointer'>
          <ListFilter size={20} className='text-off-white-2' />
          Filter
        </div>
      </motion.div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {projects.map((project, index) => (
          <motion.div
            key={project._id ?? index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index % 3 * 0.1 }}>
            <Project project={project} onEdit={handleEdit} onDelete={handleDelete} />
          </motion.div>
        ))}
      </div>

      {/* Popup Form */}
      {popupForm && (
        <form onSubmit={handleSubmit} className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-3xl max-h-[90vh] bg-[#0b1627] rounded-2xl border border-gray-800 flex flex-col">

            {/* Header */}
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-xl font-semibold text-white">
                {editingProjectId ? "Edit Project" : "Create New Project"}
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                {editingProjectId ? "Update your project details" : "Add a new project to your portfolio"}
              </p>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">

              {/* Name */}
              <div>
                <label className="text-sm text-gray-300">Project Name</label>
                <input
                  className="w-full mt-2 rounded-xl bg-[#111f36] border border-gray-800 px-4 py-3 text-gray-200 outline-none focus:border-primary"
                  placeholder="My Awesome Project"
                  value={data.name}
                  onChange={e => setData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-sm text-gray-300">Description</label>
                <textarea
                  rows={3}
                  className="w-full mt-2 rounded-xl bg-[#111f36] border border-gray-800 px-4 py-3 text-gray-200 outline-none focus:border-primary"
                  placeholder="Describe what your project does..."
                  value={data.description}
                  onChange={e => setData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>

              {/* Category + Type */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-300">Category</label>
                  <select
                    className="w-full mt-2 rounded-xl bg-[#111f36] border border-gray-800 px-4 py-3 text-gray-200 outline-none focus:border-primary"
                    value={data.category}
                    onChange={e => setData(prev => ({ ...prev, category: e.target.value }))}
                  >
                    <option value="">Select category</option>
                    <option value="Web App">Web App</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="API">API</option>
                    <option value="CLI Tool">CLI Tool</option>
                    <option value="Library">Library</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-300">Type</label>
                  <select
                    className="w-full mt-2 rounded-xl bg-[#111f36] border border-gray-800 px-4 py-3 text-gray-200 outline-none focus:border-primary"
                    value={data.type}
                    onChange={e => setData(prev => ({ ...prev, type: e.target.value }))}
                  >
                    <option value="">Select type</option>
                    <option value="Full Stack">Full Stack</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Side Project">Side Project</option>
                    <option value="Open Source">Open Source</option>
                    <option value="Client Work">Client Work</option>
                  </select>
                </div>
              </div>

              {/* Status + Active */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-300">Status</label>
                  <select
                    className="w-full mt-2 rounded-xl bg-[#111f36] border border-gray-800 px-4 py-3 text-gray-200 outline-none focus:border-primary"
                    value={data.status}
                    onChange={e => setData(prev => ({ ...prev, status: e.target.value }))}
                  >
                    <option value="">Select status</option>
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                    <option value="Archived">Archived</option>
                    <option value="In Progress">In Progress</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-300">Commits</label>
                  <input
                    type="number"
                    className="w-full mt-2 rounded-xl bg-[#111f36] border border-gray-800 px-4 py-3 text-gray-200 outline-none focus:border-primary"
                    placeholder="0"
                    value={data.commits}
                    onChange={e => setData(prev => ({ ...prev, commits: parseInt(e.target.value) || 0 }))}
                  />
                </div>
              </div>

              {/* Start + End Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-300">Start Date</label>
                  <input
                    type="date"
                    className="w-full mt-2 rounded-xl bg-[#111f36] border border-gray-800 px-4 py-3 text-gray-200 outline-none focus:border-primary"
                    value={data.startDate}
                    onChange={e => setData(prev => ({ ...prev, startDate: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-300">End Date</label>
                  <input
                    type="date"
                    className="w-full mt-2 rounded-xl bg-[#111f36] border border-gray-800 px-4 py-3 text-gray-200 outline-none focus:border-primary"
                    value={data.endDate}
                    onChange={e => setData(prev => ({ ...prev, endDate: e.target.value }))}
                  />
                </div>
              </div>

              {/* GitHub Link + Live Link */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-300">GitHub Link</label>
                  <input
                    type="text"
                    className="w-full mt-2 rounded-xl bg-[#111f36] border border-gray-800 px-4 py-3 text-gray-200 outline-none focus:border-primary"
                    placeholder="https://github.com/..."
                    value={data.githubLink}
                    onChange={e => setData(prev => ({ ...prev, githubLink: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-300">Live Link</label>
                  <input
                    type="text"
                    className="w-full mt-2 rounded-xl bg-[#111f36] border border-gray-800 px-4 py-3 text-gray-200 outline-none focus:border-primary"
                    placeholder="https://myproject.com"
                    value={data.link}
                    onChange={e => setData(prev => ({ ...prev, link: e.target.value }))}
                  />
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <label className="text-sm text-gray-300">Tech Stack</label>
                <TagInput
                  value={data.techstack}
                  onChange={v => setData(prev => ({ ...prev, techstack: v }))}
                  placeholder="Type and press Enter or comma..."
                />
              </div>

              {/* Tags */}
              <div>
                <label className="text-sm text-gray-300">Tags</label>
                <TagInput
                  value={data.tags}
                  onChange={v => setData(prev => ({ ...prev, tags: v }))}
                  placeholder="Type and press Enter or comma..."
                />
              </div>

              {/* Highlights */}
              <div>
                <label className="text-sm text-gray-300">Highlights</label>
                <textarea
                  rows={3}
                  className="w-full mt-2 rounded-xl bg-[#111f36] border border-gray-800 px-4 py-3 text-gray-200 outline-none focus:border-primary"
                  placeholder="Won hackathon, 500+ GitHub stars (one per line)"
                  value={data.highlights.join("\n")}
                  onChange={e => setData(prev => ({
                    ...prev,
                    highlights: e.target.value.split("\n").map(h => h.trim()).filter(Boolean)
                  }))}
                />
              </div>

              {/* Collaborators */}
              <div>
                <label className="text-sm text-gray-300">Collaborators</label>
                <TagInput
                  value={data.collaborators}
                  onChange={v => setData(prev => ({ ...prev, collaborators: v }))}
                  placeholder="Type and press Enter or comma..."
                />
              </div>

              {/* Featured + Active toggles */}
              <div className="flex gap-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-primary"
                    checked={data.isfeatured}
                    onChange={e => setData(prev => ({ ...prev, isfeatured: e.target.checked }))}
                  />
                  <span className="text-sm text-gray-300">Featured project</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-primary"
                    checked={data.active}
                    onChange={e => setData(prev => ({ ...prev, active: e.target.checked }))}
                  />
                  <span className="text-sm text-gray-300">Active</span>
                </label>
              </div>

            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-800 flex justify-end gap-4">
              <button
                type='button'
                onClick={closeModal}
                className="px-6 py-3 rounded-xl border border-gray-700 text-gray-300 hover:bg-gray-800">
                Cancel
              </button>
              <button
                type='submit'
                className="px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium">
                {editingProjectId ? "Save Changes" : "Create Project"}
              </button>
            </div>

          </div>
        </form>
      )}
    </div>
  )
}

export default Page