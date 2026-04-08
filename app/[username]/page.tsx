import { notFound } from "next/navigation"
import Link from "next/link"

interface Profile {
  fullname: string
  username: string
  bio: string
  location: string
  email: string
  portfolio: string
  github: string
  linkedin: string
  twitter: string
  about: string
  top_skills: string[]
  achievement: string[]
  showEmail: boolean
}

interface Project {
  _id: string
  name: string
  description: string
  techstack: string[]
  lastUpdated: string
  link: string
  active: boolean
}

async function getProfile(username: string) {
  const res = await fetch(
    `${process.env.API_URL}/u/${username}`,
    { cache: "no-store" }
  )
  if (!res.ok) return null
  return res.json()
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params;

  const data = await getProfile(username);
  if (!data) notFound();

  const profile: Profile = data.profile
  const projects: Project[] = data.projects

  const initials = profile.fullname
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="min-h-screen bg-background text-off-white-1">
      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex items-start gap-6 mb-10">
          <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-medium flex-shrink-0">
            {initials}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap mb-1">
              <h1 className="text-2xl font-medium text-off-white-1">{profile.fullname}</h1>
              <span className="text-xs bg-primary/15 text-primary/80 border border-primary/30 px-3 py-1 rounded-full">
                @{profile.username}
              </span>
            </div>
            {profile.bio && (
              <p className="text-sm text-off-white-2 mb-2">{profile.bio}</p>
            )}
            {profile.location && (
              <p className="text-sm text-off-white-2/70">{profile.location}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-[1fr_280px] gap-6 items-start">

          {/* Left column */}
          <div className="flex flex-col gap-6">

            {/* Projects */}
            {projects.length > 0 && (
              <div className="bg-card border border-slate-700/50 rounded-xl p-5">
                <p className="text-xs font-medium text-off-white-2/70 uppercase tracking-wider mb-4">Projects</p>
                <div className="flex flex-col gap-4">
                  {projects.map((project) => (
                    <div key={project._id} className="bg-background-2 border border-slate-700/50 rounded-xl p-4 flex flex-col gap-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-off-white-1 mb-1">{project.name}</p>
                          <p className="text-xs text-off-white-2 leading-relaxed">{project.description}</p>
                        </div>
                        <span className="text-xs text-off-white-2/60 whitespace-nowrap ml-3">{project.lastUpdated}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.techstack.map((tech) => (
                          <span key={tech} className="text-xs bg-white/5 text-off-white-2 border border-white/8 px-2 py-1 rounded-md">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-off-white-2/70 flex items-center gap-1">
                          <span className={`w-2 h-2 rounded-full ${project.active ? "bg-green-500" : "bg-off-white-2/50"}`}></span>
                          {project.active ? "Active" : "Archived"}
                        </span>
                        {project.link && (
                          <Link href={project.link} target="_blank" className="text-xs text-primary hover:text-primary/70 transition duration-150">
                            View project →
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements */}
            {profile.achievement.length > 0 && (
              <div className="bg-card border border-slate-700/50 rounded-xl p-5">
                <p className="text-xs font-medium text-off-white-2/70 uppercase tracking-wider mb-4">Achievements</p>
                <div className="flex flex-col gap-3">
                  {profile.achievement.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-background-2 border border-slate-700/50 rounded-lg p-3">
                      <span className="text-lg">🏆</span>
                      <p className="text-sm text-off-white-2 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6">

            {/* Top Skills */}
            {profile.top_skills.length > 0 && (
              <div className="bg-card border border-slate-700/50 rounded-xl p-5">
                <p className="text-xs font-medium text-off-white-2/70 uppercase tracking-wider mb-4">Top Skills</p>
                <div className="flex flex-wrap gap-2">
                  {profile.top_skills.map((skill) => (
                    <span key={skill} className="text-xs bg-primary/15 text-primary/80 border border-primary/30 px-3 py-1 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Social Links */}
            <div className="bg-card border border-slate-700/50 rounded-xl p-5">
              <p className="text-xs font-medium text-off-white-2/70 uppercase tracking-wider mb-4">Links</p>
              <div className="flex flex-col gap-2">
                {profile.github && (
                  <Link href={profile.github} target="_blank" className="flex items-center gap-2 text-sm text-off-white-2 hover:text-off-white-1 border border-slate-700/50 bg-background-2 px-3 py-2 rounded-lg hover:border-primary/50 transition duration-200">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    {profile.github.replace("https://github.com/", "github.com/")}
                  </Link>
                )}
                {profile.linkedin && (
                  <Link href={profile.linkedin} target="_blank" className="flex items-center gap-2 text-sm text-off-white-2 hover:text-off-white-1 border border-slate-700/50 bg-background-2 px-3 py-2 rounded-lg hover:border-primary/50 transition duration-200">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    {profile.linkedin.replace("https://", "")}
                  </Link>
                )}
                {profile.twitter && (
                  <Link href={profile.twitter} target="_blank" className="flex items-center gap-2 text-sm text-off-white-2 hover:text-off-white-1 border border-slate-700/50 bg-background-2 px-3 py-2 rounded-lg hover:border-primary/50 transition duration-200">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    {profile.twitter.replace("https://twitter.com/", "@")}
                  </Link>
                )}
                {profile.portfolio && (
                  <Link href={profile.portfolio} target="_blank" className="flex items-center gap-2 text-sm text-off-white-2 hover:text-off-white-1 border border-slate-700/50 bg-background-2 px-3 py-2 rounded-lg hover:border-primary/50 transition duration-200">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    {profile.portfolio.replace("https://", "")}
                  </Link>
                )}
              </div>
            </div>

            {/* About */}
            {profile.about && (
              <div className="bg-card border border-slate-700/50 rounded-xl p-5">
                <p className="text-xs font-medium text-off-white-2/70 uppercase tracking-wider mb-3">About</p>
                <p className="text-sm text-off-white-2 leading-relaxed">{profile.about}</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}