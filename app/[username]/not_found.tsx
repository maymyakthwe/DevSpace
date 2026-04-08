import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background gap-4">
      <h1 className="text-3xl font-medium text-off-white-1">404</h1>
      <p className="text-off-white-2">This profile doesn&apos;t exist or is private.</p>
      <Link href="/" className="text-primary hover:text-primary/70 transition duration-150 text-sm">
        Go home →
      </Link>
    </div>
  )
}