import React from "react";

export type sidebarProps = {
    name: string;
    icon: React.ReactNode;
    href: string;
}

export type statsType = {
    total:number;
    icon:React.ReactNode;
    label:string;
    change:string;
    color:string;
}

export type projectType = {
    _id?: string;
    name: string;  
    description: string;
    techstack: string[];
    collaborators: string[];
    commits: number;
    category: string;
    type:string;
    githubLink:string;
    highlights: string[];
    isfeatured: boolean;
    tags: string[];
    link: string;
    active: boolean;
    startDate:string;
    endDate:string;
    status:string;
}




export type userRegister = {
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    confirmPassword: string
    
}



export type profileType={
  _id?: string,
  fullname: string,
  username: string,
  bio: string,
  location: string,
  email:string,
  portfolio: string,
  github: string,
  linkedin:string ,
  twitter: string,
  devSpace: string,
  about: string,
  top_skills: string[],
  achievement: string[],
  public: boolean,
  showEmail: boolean,
  userId:string
}


export type skillType={
    _id?:string,
    name:string,
    catergory:string,
    category: string
    proficiency: string
    yearsOfExperience: number
    projectRefs: string[]  
    isTopSkill: boolean
    icon: string
    userId?: string
}
