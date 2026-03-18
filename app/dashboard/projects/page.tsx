"use client"
import Project from '@/components/Project'
import { createProject, deleteProject, getProjects, updateProject } from '@/lib/project-route'
import {  projectType } from '@/Types/types'
import {motion} from 'framer-motion'
import { Plus,Search,ListFilter } from 'lucide-react'
import { useEffect, useState } from 'react'


const initialProjectData: projectType = {
  name: "",
  description: "",
  techstack: [],
  link: "",
  active: false,
  lastUpdated: ""
}

const Page =  () => {

  const [projects,setProjects]= useState<projectType[]>([])
  const [popupForm, setPopupForm] = useState<boolean>(false)
  const [data,setData]=useState<projectType>(initialProjectData)
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null)

  const handleSubmit=async(e: React.SubmitEvent<HTMLFormElement>)=>{
    e.preventDefault() 
        
        try{
          if (editingProjectId) {
            const updatedProject = await updateProject(editingProjectId, data)
            setProjects(prev =>
              prev.map(project =>
                project._id === editingProjectId ? updatedProject : project
              )
            )
          } else {
            const result = await createProject(data)
            setProjects(prev => [result, ...prev])
          }

          setPopupForm(false)
          setEditingProjectId(null)
          setData(initialProjectData)
        }catch(error){
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
    setData({
      _id: project._id,
      name: project.name,
      description: project.description,
      techstack: project.techstack,
      link: project.link,
      active: project.active,
      lastUpdated: project.lastUpdated
    })
    setPopupForm(true)
  }

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this project?")

    if (!confirmed) {
      return
    }

    try {
      await deleteProject(id)
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

  useEffect(()=>{
    const fetchProjects = async()=>{
      const data = await getProjects()
      setProjects(data)
    }
    fetchProjects()
  },[])


  return (
    <div className=" p-10 text-off-white-1  min-h-full relative">
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
         <motion.button
          initial={{opacity:0,y:-20}}
          animate={{opacity: 1,y:0}}
          transition={{ delay: 0.1 }} 
          className=" p-3 bg-primary rounded-lg flex items-center gap-2 cursor-pointer hover:bg-primary/90 transition duration-100 text-white active:bg-white active:text-primary"
          onClick={openCreateModal}>
          <Plus  size={24}/>
          New Project
        </motion.button>
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
                  key={project._id ?? index}
                  initial={{opacity:0,y:20}}
                  animate={{opacity:1,y:0}}
                  transition={{delay:index%3*0.1}} 
                  >

           <Project project={project} onEdit={handleEdit} onDelete={handleDelete}/>
          
          </motion.div>          
        ))}
      </div>


      {/* pop up form */}
      {popupForm && (
        <form onSubmit={handleSubmit} className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">

          {/* Modal */}
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

            {/* Scrollable form */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">

              {/* Project Name */}
              <div>
                <label className="text-sm text-gray-300">Project Name</label>
                <input
                  className="w-full mt-2 rounded-xl bg-[#111f36] border border-gray-800 px-4 py-3 text-gray-200"
                  placeholder="My Awesome Project"
                  name='name'
                  value={data.name}
                  onChange={(e) =>
                    setData(prev => ({
                      ...prev,
                      name: e.target.value
                    }))
                  }
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-sm text-gray-300">Description</label>
                <textarea
                  rows={4}
                  className="w-full mt-2 rounded-xl bg-[#111f36] border border-gray-800 px-4 py-3 text-gray-200"
                  placeholder="Describe what your project does..."
                  name='description'
                  value={data.description}
                  onChange={(e) =>
                    setData(prev => ({
                      ...prev,
                      description: e.target.value
                    }))
                  }
                />
              </div>

             {/* Status + Repo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div>
          <label className="text-sm text-gray-300">Status</label>
          <select
            name="active"
            value={data.active ? "true" : "false"}
            onChange={(e) =>
              setData(prev => ({
                ...prev,
                active: e.target.value === "true"
              }))
            }
            className="w-full mt-2 rounded-xl bg-[#111f36] border border-gray-800 px-4 py-3 text-gray-200 outline-none focus:border-blue-500"
          >
            <option value="true">Active</option>
            <option value="false">Not Active</option>
          </select>
        </div>

          <div>
            <label className="text-sm text-gray-300">Repository URL</label>
            <input
              type="text"
              placeholder="https://github.com/..."
              className="w-full mt-2 rounded-xl bg-[#111f36] border border-gray-800 px-4 py-3 text-gray-200 outline-none focus:border-blue-500"
              name='link'
              value={data.link}
              onChange={(e)=>
                setData(prev=>({
                  ...prev,
                  link:e.target.value
                }))
              }
            />
          </div>

        </div>

        {/* Tech stack */}
        <div>
          <label className="text-sm text-gray-300">Tech Stack</label>
          <input
            type="text"
            placeholder="React, Node.js, PostgreSQL (comma separated)"
            className="w-full mt-2 rounded-xl bg-[#111f36] border border-gray-800 px-4 py-3 text-gray-200 outline-none focus:border-blue-500"
            name='techstack'
            value={data.techstack.join(", ")}
            onChange={(e) =>
              setData(prev => ({
                ...prev,
                techstack: e.target.value
                  .split(",")
                  .map(t => t.trim())
                  .filter(Boolean)
              }))
            }
          />
        </div>


            </div>

            {/* Footer  */}
            <div className="p-6 border-t border-gray-800 flex justify-end gap-4">

              <button
                type='button'
                onClick={closeModal}
                className="px-6 py-3 rounded-xl border border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                Cancel
              </button>

              <button type='submit' className="px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-medium shadow-lg">
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
