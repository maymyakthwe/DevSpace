import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {ArrowRight, CircleCheck, Sparkles,CodeXml, Award, CircleStar, TrendingUp, Users, Zap} from 'lucide-react'
import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Features */}
      <div className=" min-h-screen">
      <Navbar />

        <div className="flex text-primary justify-center items-center gap-3 text-sm bg-primary/10 px-5 py-3 rounded-3xl border border-primary/20 max-w-max mx-auto mt-10">
          <Sparkles size={18} className=" " />
          <h1 >Trusted by 10,000+ developers worldwide</h1>
        </div>

        <div className="flex flex-col justify-center items-center gap-5 text-center mt-20 text-7xl font-semibold text-off-white-1">
          <h1>Your Developer Journey,</h1>
          <h1 className="bg-linear-to-r  from-primary via-[#c07aff] to-primary bg-clip-text text-transparent ">Beautifully Tracked</h1>
          <p className="text-2xl leading-relaxed font-medium text-slate-400 max-w-2xl">DevBoard is the ultimate platform for developers to manage projects, track skills, and build a stunning portfolio. Elevate your career with insights that matter.</p>
        </div>

        <div className='flex text-xl gap-5 justify-center items-center mt-10'>
          <div className='px-8 py-4 bg-primary hover:bg-primary/80 flex text-white items-center gap-1 rounded-xl duration-300  ml-4'>
                <Link href="/auth/register">Start Free</Link >
                <ArrowRight size={18}  />
            </div>
            <div className='px-8 py-4 hover:bg-card bg-card/60 border border-slate-600/40 rounded-xl  duration-300 text-off-white-2  hover:text-white'>Watch Demo</div>
        </div>

        <div className="flex justify-center items-center gap-4 mt-10 text-off-white-2/80">
          <div className="text-sm flex items-center gap-2 justify-center  ">
            <CircleCheck size={18} className="text-primary" />
            <p className="">No credit card required</p>
          </div>
          <div className="text-sm flex items-center gap-2 justify-center  ">
            <CircleCheck size={18} className="text-primary" />
            <p className="">Free to use</p>
          </div>
          <div className="text-sm flex items-center gap-2 justify-center  ">
            <CircleCheck size={18} className="text-primary" />
            <p className="">Share to your potential clients</p>
          </div>
        </div>
      </div>

    {/* Numbers Section */}
      <div className="border-y border-slate-600/40 bg-card/60  mt-20 p-5 w-full flex justify-center items-center h-48">
        <div className="grow flex-col flex items-center justify-center  ">
          <span className="text-transparent bg-gradient-to-r from-primary to-[#c07aff] bg-clip-text text-3xl">10,000+</span> 
          <span className="text-off-white-2">Active Developers</span>
        </div>
        <div className="grow flex-col flex items-center justify-center">
          <span className="text-transparent bg-gradient-to-r from-primary to-[#c07aff] bg-clip-text text-3xl">50,000+</span> 
          <span className="text-off-white-2">Projects Tracked</span>
        </div><div className="grow flex-col flex items-center justify-center">
          <span className="text-transparent bg-gradient-to-r from-primary to-[#c07aff] bg-clip-text text-3xl">100,000+</span> 
          <span className="text-off-white-2">Skills Mastered</span>
        </div><div className="grow flex-col flex items-center justify-center">
          <span className="text-transparent bg-gradient-to-r from-primary to-[#c07aff] bg-clip-text text-3xl">25,000+</span> 
          <span className="text-off-white-2">Goals Achieved</span>
        </div>

      </div>

      {/* Marketing Section */}
      <div  >
        <div className="flex flex-col justify-center items-center gap-5 text-center mt-20 text-5xl font-semibold text-off-white-1"> 
          <h1>Everything You Need to Succeed</h1> 
          <p className="text-xl  font-medium text-off-white-2 max-w-2xl">Powerful features designed to help developers track progress, showcase skills, and achieve their career goals.</p>
        </div>
        <div className="flex flex-wrap gap-10  mt-20 px-10">
          <div className="w-100 border border-slate-600/40 bg-card/60 min-h-80 rounded-3xl p-10  hover:border-primary/50 duration-200 group flex flex-col justify-evenly grow">
            <div className="w-13 h-14 bg-primary/10 rounded-xl  group-hover:bg-primary/20 duration-300 flex items-center justify-center mb-10">
              <CodeXml size={20} className="text-primary " />
            </div>
            <h2 className="text-xl font-semibold mb-4">Comprehensive Project Tracking</h2>
            <p className="text-sm text-off-white-2 ">Easily manage and track all your development projects in one place, with detailed insights and progress monitoring.</p>
            
          </div>
          <div className="w-100 border border-slate-600/40 bg-card/60 min-h-80 rounded-3xl p-10  hover:border-primary/50 duration-200 group flex flex-col justify-evenly grow">
            <div className="w-13 h-14 bg-primary/10 rounded-xl  group-hover:bg-primary/20 duration-300 flex items-center justify-center mb-10">
              <Award size={20} className="text-primary " />
            </div>
            <h2 className="text-xl font-semibold mb-4">Skills Tracking</h2>
            <p className="text-sm text-off-white-2 ">Monitor your technical skills growth with interactive visualizations and goals.</p>
            
          </div>
          <div className="w-100 border border-slate-600/40 bg-card/60 min-h-80 rounded-3xl p-10  hover:border-primary/50 duration-200 group flex flex-col justify-evenly grow">
            <div className="w-13 h-14 bg-primary/10 rounded-xl  group-hover:bg-primary/20 duration-300 flex items-center justify-center mb-10">
              <CircleStar size={20} className="text-primary " />
            </div>
            <h2 className="text-xl font-semibold mb-4">Goal Setting</h2>
            <p className="text-sm text-off-white-2 ">Set milestones and track your progress towards becoming a better developer.</p>
            
          </div>
          <div className="w-100 border border-slate-600/40 bg-card/60 min-h-80 rounded-3xl p-10  hover:border-primary/50 duration-200 group flex flex-col justify-evenly grow">
            <div className="w-13 h-14 bg-primary/10 rounded-xl  group-hover:bg-primary/20 duration-300 flex items-center justify-center mb-10">
              <TrendingUp size={20} className="text-primary " />
            </div>
            <h2 className="text-xl font-semibold mb-4">Activity Feed</h2>
            <p className="text-sm text-off-white-2 ">Stay motivated with real-time insights into your development journey.</p>
            
          </div>
          <div className="w-100 border border-slate-600/40 bg-card/60 min-h-80 rounded-3xl p-10  hover:border-primary/50 duration-200 group flex flex-col justify-evenly grow">
            <div className="w-13 h-14 bg-primary/10 rounded-xl  group-hover:bg-primary/20 duration-300 flex items-center justify-center mb-10">
              <Users size={20} className="text-primary " />
            </div>
            <h2 className="text-xl font-semibold mb-4">Public Profiles</h2>
            <p className="text-sm text-off-white-2 ">Generate a stunning developer portfolio to showcase your skills to the world.</p>
            
          </div>
          <div className="w-100 border border-slate-600/40 bg-card/60 min-h-80 rounded-3xl p-10  hover:border-primary/50 duration-200 group flex flex-col justify-evenly grow">
            <div className="w-13 h-14 bg-primary/10 rounded-xl  group-hover:bg-primary/20 duration-300 flex items-center justify-center mb-10">
              <Zap size={20} className="text-primary " />
            </div>
            <h2 className="text-xl font-semibold mb-4">Real-time Sync</h2>
            <p className="text-sm text-off-white-2 ">Your data stays synchronized across all devices, instantly and securely.</p>
            
          </div>
          
        </div>
      </div>


      {/* Footer */}
      <Footer/>
      
    </div>
  );
}
