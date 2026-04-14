import { skillType } from "@/Types/types"

const API = process.env.NEXT_PUBLIC_API_URL

export const getSkills = async (token: string | null): Promise<skillType[]> => {
  const res = await fetch(`${API}/skills/`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error("Failed to fetch skills")
  return res.json()
}

export const createSkill = async (skill: skillType, token: string | null): Promise<skillType> => {
  const res = await fetch(`${API}/skills/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(skill)
  })
  if (!res.ok) throw new Error("Failed to create skill")
  return res.json()
}

export const updateSkill = async (id: string, skill: skillType, token: string | null): Promise<skillType> => {
  const res = await fetch(`${API}/skills/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(skill)
  })
  if (!res.ok) throw new Error("Failed to update skill")
  return res.json()
}

export const deleteSkill = async (id: string, token: string | null): Promise<void> => {
  const res = await fetch(`${API}/skills/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error("Failed to delete skill")
}