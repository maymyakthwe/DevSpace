import { signIn, signOut, useSession } from "next-auth/react"

export function useToken() {
  const { data: session } = useSession()
  return session?.accessToken ?? null
}

export function useIsLoggedIn() {
  const { data: session } = useSession()
  return !!session?.accessToken
}

export const registerUser = async (data: {
  fullname:string
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
  const result = await signIn("credentials", {
    email: data.email,
    password: data.password,
    redirect: false,
  })

  if (result?.error) {
    throw new Error("Invalid credentials")
  }

  return result
}

export const logout = async () => {
  await signOut({ callbackUrl: "/auth/login" })
}


