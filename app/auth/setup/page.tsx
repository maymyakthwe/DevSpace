"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToken } from "@/lib/auth-route"

export default function SetupPage() {
  const [username, setUsername] = useState("")
  const [fullname, setFullname] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const token = useToken()

  useEffect(() => {
    if (!token) return
    fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setFullname(data.fullname))
  }, [token])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!/^[a-z0-9_-]{3,20}$/.test(username)) {
      setError("3-20 characters, lowercase letters, numbers, hyphens, underscores only")
      setLoading(false)
      return
    }

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/auth/setup-username",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ username }),
        }
      )
      const data = await response.json()
      if (!response.ok) {
        setError(data.detail || "Something went wrong")
        return
      }
      router.push("/dashboard/overview")
    } catch {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 bg-background">
      <div className="text-center text-off-white-1">
        <h1 className="text-3xl font-bold mb-3">
          Welcome, {fullname || "there"} 👋
        </h1>
        <p className="text-off-white-2">One last step — choose your username</p>
        <p className="text-off-white-2/50 text-sm mt-1">
          devspace.com/<span className="text-primary">{username || "username"}</span>
        </p>
      </div>
      <div className="w-1/3 border border-slate-700/50 bg-card rounded-lg p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 text-sm">
            <label htmlFor="username">Username</label>
            <input
              className="w-full p-4 rounded-2xl border border-slate-700/50 bg-background-2 outline-none focus:border-primary transition duration-300"
              type="text"
              id="username"
              placeholder="cooldevguy"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase())}
            />
            <p className="text-off-white-2/50 text-xs">
              3-20 characters. Letters, numbers, hyphens, underscores only.
            </p>
            {error && <p className="text-red-500 text-xs">{error}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white py-3 rounded-2xl hover:bg-primary/90 transition duration-300 disabled:opacity-50"
          >
            {loading ? "Checking..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  )
}