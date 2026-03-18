import { getToken } from "./auth-route"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getUserProfile(){
    const token = getToken();
    const res=await fetch(`${API_URL}/profile/`,{method:"GET",cache:'no-store',headers:{
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    }})
    if(!res.ok){
        throw new Error("Failed to fetch projects")
    }
    return res.json()
}