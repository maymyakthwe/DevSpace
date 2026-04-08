import { projectType } from "@/Types/types"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getProjects(token:string|null) {
  if (!token) {
        throw new Error("No authentication token available")
    }
    console.log("Fetching projects with token:", token) // Debugging log
  const res=await fetch(`${API_URL}/projects`,
    {
      method:"GET",
      cache:'no-store',
      headers:{
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  }})
  if(!res.ok){
    throw new Error("Failed to fetch projects")
  }
  return res.json()
}


export const createProject = async (data: projectType,token:string|null) => {
  if (!token) {
        throw new Error("No authentication token available")
    }
  console.log("Fetching projects with token:", token) // Debugging log
  const now = new Date();

  const formattedDate = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;

  data = {
    ...data,
    lastUpdated: formattedDate
  };

  const res =  await fetch(process.env.NEXT_PUBLIC_API_URL + "/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data)
  })

   const result = await res.json()

  if (!res.ok) {
    throw new Error(result.detail || "Failed to create project")
  }

  return result
}

export const updateProject = async (id: string, data: projectType,token:string|null) => {
  if (!token) {
        throw new Error("No authentication token available")
    }
  const now = new Date()
  const formattedDate = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`

  const payload = {
    ...data,
    lastUpdated: formattedDate
  }

  const res = await fetch(`${API_URL}/projects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(payload)
  })

  const result = await res.json()

  if (!res.ok) {
    throw new Error(result.detail || "Failed to update project")
  }

  return {
    ...payload,
    _id: id
  }
}

export const deleteProject = async (id: string,token:string|null) => {
  if (!token) {
        throw new Error("No authentication token available")
    }
  const res = await fetch(`${API_URL}/projects/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })

  const result = await res.json()

  if (!res.ok) {
    throw new Error(result.detail || "Failed to delete project")
  }

  return result
}
