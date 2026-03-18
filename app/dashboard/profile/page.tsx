"use client"
import { MapPin, Link as LinkIcon, Mail, Github, Linkedin, Twitter, Copy, ExternalLink } from "lucide-react";
import {motion} from "framer-motion"
import { profileType } from "@/Types/types";
import { useEffect, useState } from "react";
import { getUserProfile } from "@/lib/profile-route";



export const initialProfile: profileType = {
  _id: "",
  username: "",
  bio: "",
  location: "",
  email: "",
  portfolio: "",
  github: "",
  linkedin: "",
  twitter: "",
  devSpace: "",
  about: "",
  top_skills: [],
  achievement: [],
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
  const profileUrl = "devboard.io/alex-morgan";
  const [profileData,setProfileData]=useState<profileType>(initialProfile)

  useEffect(()=>{
    const fetchProfile = async()=>{
      const data =  await getUserProfile()
      setProfileData(data)
    }
    fetchProfile()
  },[])

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
                <h2 className="text-2xl font-semibold mb-2 tracking-tight">{profileData.username}</h2>
                <p className="text-sm text-muted-foreground mb-6">{profileData.bio}</p>
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

          {/* Stats Card */}
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
          </motion.div>

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
              <h3 className="font-semibold text-lg mb-4 tracking-tight">{profileData.devSpace}</h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Share your developer profile with recruiters, colleagues, or on social media.
              </p>
              <div className="flex items-center gap-3">
                <div className="flex-1 flex items-center gap-3 px-5 py-4 rounded-xl bg-accent border border-border">
                  <LinkIcon className="size-5 text-muted-foreground" />
                  <span className="text-sm font-medium">{profileUrl}</span>
                </div>
                <button  className="border-border h-[56px] px-5 hover:border-primary/50 transition-colors">
                  <Copy className="size-4 mr-2" />
                  Copy
                </button>
                <button  className="border-border h-[56px] px-5 hover:border-primary/50 transition-colors">
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
              <h3 className="font-semibold text-lg mb-5 tracking-tight">Top Skills</h3>
              <div className="flex flex-wrap gap-3">
                {/* {topSkills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="px-4 py-2 bg-accent text-foreground hover:bg-primary/10 hover:text-primary transition-colors font-medium text-sm cursor-pointer"
                  >
                    {skill}
                  </Badge>
                ))} */}
              </div>
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

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="p-8 bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-slate-600/40">
              <h3 className="font-semibold text-lg mb-6 tracking-tight">Achievements</h3>
              <div className="space-y-5">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-5">
                    <div className="p-3 rounded-xl bg-primary/10 flex-shrink-0">
                      <span className="text-xl">🏆</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2 tracking-tight">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">{achievement.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Privacy Settings */}
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
          </motion.div>
        </div>
      </div>
    </div>
  );
}