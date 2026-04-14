"use client"
import { MapPin, Link as LinkIcon, Mail, Github, Linkedin, Twitter, Copy, ExternalLink} from "lucide-react";
import {motion} from "framer-motion"
import { profileType,skillType } from "@/Types/types";
import { useEffect, useState } from "react";
import { getUserProfile } from "@/lib/profile-route";
import { useToken } from "@/lib/auth-route";
import { getSkills } from "@/lib/skill-route"
import Image from "next/image";


export const initialProfile: profileType = {
  _id: "",
  fullname: "Example Developer",
  username: "Example123",
  bio: "This is a sample bio for the developer profile. Passionate about coding and open source.",
  location: "Example city, Country",
  email: "Toji@example.com",
  portfolio: "https://example.com",
  github: "https://github.com/example",
  linkedin: "https://linkedin.com/in/example",
  twitter: "https://twitter.com/example",
  devSpace: "https://devspace.com/example",
  about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  top_skills: ["JavaScript", "React", "Node.js", "Python", "Django"],
  achievement: ["Full-stack web application", "Spoke at a tech conference"],
  public: true,
  showEmail: false,
  userId: "",
};

const achievements = [
  { title: "Early Adopter", description: "Joined DevBoard in the first month", date: "Jan 2024" },
  { title: "Project Master", description: "Completed 20+ projects", date: "Feb 2024" },
  { title: "Skill Seeker", description: "Tracked 15+ skills", date: "Feb 2024" },
];

export default function Profile() {
  const [profileData,setProfileData]=useState<profileType>(initialProfile)
  const token = useToken()
  const [skills, setSkills] = useState<skillType[]>([])

  useEffect(() => {
    const fetchAll = async () => {
      if (!token) return
      const [profileData, skillsData] = await Promise.all([
        getUserProfile(token),
        getSkills(token),
      ])
      setProfileData(profileData)
      setSkills(skillsData.filter((s: skillType) => s.isTopSkill))
    }
    if (token) fetchAll()
  }, [token])

 

    return (
      <div className="p-12 max-w-360 mx-auto">
        {/* Header */}
        <div className="mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-semibold mb-3 tracking-tight"
          >
            Developer Profile
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Manage your public developer profile and share it with others.
          </motion.p>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="col-span-1 space-y-6 ">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="p-8 bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-slate-600/40">
                <div className="flex flex-col items-center text-center mb-8">
                  <div className="size-28 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                    <span className="text-4xl">👨‍💻</span>
                  </div>
                  <h2 className="text-2xl font-semibold mb-2 tracking-tight">{profileData.fullname}</h2>
                  <h2 className="text-sm mb-2 tracking-tight">&#40; {profileData.username} &#41;</h2>
                  <p className="text-sm text-[#fff7] mb-6">{profileData.bio}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="size-4" />
                    <span>{profileData.location}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <a
                    href="#"
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="size-4" />
                    <span>{profileData.email}</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <LinkIcon className="size-4" />
                    <span>{profileData.devSpace}</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Github className="size-4" />
                    <span>{profileData.github}</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Linkedin className="size-4" />
                    <span>{profileData.linkedin}</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Twitter className="size-4" />
                    <span>{profileData.twitter}</span>
                  </a>
                </div>

                <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 shadow-lg shadow-primary/20">
                  Edit Profile
                </button>
              </div>
            </motion.div>

            {/* Stats Card
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}

            >
              <div className="p-8 bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-slate-600/40">
                <h3 className="font-semibold text-lg mb-6 tracking-tight">Profile Stats</h3>
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Profile Views</span>
                    <span className="font-semibold text-lg">1,248</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Projects</span>
                    <span className="font-semibold text-lg">24</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Skills</span>
                    <span className="font-semibold text-lg">18</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Commits</span>
                    <span className="font-semibold text-lg">347</span>
                  </div>
                </div>
              </div>
            </motion.div> */}

            {/* Profile Actions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
            </motion.div>
          </div>

          {/* Right Column - Profile Details */}
          <div className="col-span-2 space-y-6 ">
            {/* Public Profile URL */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="p-8 bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-slate-600/40">
                <h3 className="font-semibold text-lg mb-4 tracking-tight">Public Profile URL</h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  Share your developer profile with recruiters, colleagues, or on social media.
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 flex items-center gap-3 px-5 py-4 rounded-xl bg-accent border border-border">
                    <LinkIcon className="size-5 text-muted-foreground" />
                    <span className="text-sm font-medium">{profileData.devSpace}</span>
                  </div>
                  <button  className="border-border h-14 px-5 hover:border-primary/50 transition-colors">
                    <Copy className="size-4 mr-2" />
                    Copy
                  </button>
                  <button  className="border-border h-14 px-5 hover:border-primary/50 transition-colors">
                    <ExternalLink className="size-4 mr-2" />
                    View
                  </button>
                </div>
              </div>
            </motion.div>

            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="p-8 bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-slate-600/40">
                <h3 className="font-semibold text-lg mb-5 tracking-tight">About</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {profileData.about}
                </p>
              </div>
            </motion.div>

            {/* Top Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
          <div className="p-8 bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-slate-600/40">
            <h3 className="font-semibold text-lg tracking-tight">Top Skills</h3>

            {skills.length === 0 ? (
              <p className="text-sm text-off-white-2/60">No top skills added yet. Mark skills as top skills in the Skills page.</p>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {skills.map((skill, index) => {
                  const proficiencyWidth: Record<string, string> = {
                    "Beginner": "w-1/4",
                    "Intermediate": "w-1/2",
                    "Advanced": "w-3/4",
                    "Expert": "w-full",
                  }
                  const proficiencyColor: Record<string, string> = {
                    "Beginner": "bg-blue-500",
                    "Intermediate": "bg-yellow-500",
                    "Advanced": "bg-primary",
                    "Expert": "bg-green-500",
                  }
                  const barWidth = proficiencyWidth[skill.proficiency] ?? "w-1/2"
                  const barColor = proficiencyColor[skill.proficiency] ?? "bg-primary"

            return (
              <div key={index} className="flex items-center gap-3 p-3 bg-background-2 rounded-xl border border-slate-700/40">
                {/* Icon */}
                {skill.icon ? (
                  <Image
                    src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}/${skill.icon}-original.svg`}
                    alt={skill.name}
                    width={28}
                    height={28}
                    className="w-7 h-7 shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none'
                    }}
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <span className="text-xs text-primary font-medium">
                      {skill.name[0].toUpperCase()}
                    </span>
                  </div>
                )}

                {/* Name + bar */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-off-white-1 truncate">{skill.name}</p>
                    <span className="text-xs text-off-white-2/60 ml-2 shrink-0">
                      {skill.yearsOfExperience}y
                    </span>
                  </div>
                  <div className="w-full bg-slate-700/30 rounded-full h-1.5">
                    <div className={`h-1.5 rounded-full ${barColor} ${barWidth} transition-all duration-500`} />
                  </div>
                  <p className="text-xs text-off-white-2/50 mt-1">{skill.proficiency}</p>
                </div>
              </div>)})}
            </div>)}
          </div>
        </motion.div>

            {/* Connections */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {/* <ConnectionsCard /> */}
            </motion.div>

            

            {/* Privacy Settings
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="p-8 bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-slate-600/40">
                <h3 className="font-semibold text-lg mb-6 tracking-tight">Privacy Settings</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold mb-2 tracking-tight">Public Profile</p>
                      <p className="text-sm text-muted-foreground">Make your profile visible to everyone</p>
                    </div>
                    <div className="relative inline-block w-12 h-7">
                      <input type="checkbox" className="peer sr-only" defaultChecked />
                      <div className="peer h-7 w-12 rounded-full bg-accent peer-checked:bg-primary transition-colors cursor-pointer"></div>
                      <div className="absolute left-1 top-1 size-5 rounded-full bg-background transition-transform peer-checked:translate-x-5 shadow-sm"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold mb-2 tracking-tight">Show Email</p>
                      <p className="text-sm text-muted-foreground">Display email address on public profile</p>
                    </div>
                    <div className="relative inline-block w-12 h-7">
                      <input type="checkbox" className="peer sr-only" />
                      <div className="peer h-7 w-12 rounded-full bg-accent peer-checked:bg-primary transition-colors cursor-pointer"></div>
                      <div className="absolute left-1 top-1 size-5 rounded-full bg-background transition-transform peer-checked:translate-x-5 shadow-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div> */}
          </div>
        </div>
      </div>
    );
  }
