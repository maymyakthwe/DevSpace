"use client"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SetupCheck() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return
    if (session?.setupIncomplete) {
      router.push("/auth/setup")
    } else {
      router.push("/dashboard/overview")
    }
  }, [session, status])

  return (
    <div className="flex items-center justify-center min-h-screen text-off-white-1">
      Loading...
    </div>
  )
}