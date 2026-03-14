

export function setToken(token: string) {
  localStorage.setItem('token', token)
}
export function getToken(){
    return localStorage.getItem('token')
}

export function isLoggedIn(){
    return !!getToken()
}


export const registerUser = async (data: {
  username: string
  email: string
  password: string
}) => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.detail || "Registration failed")
  }

  return result
}

export const loginUser = async (data: {
  email: string
  password: string
  }) => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.detail || "Login failed")
  }

  return result
}
