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
    lastUpdated: string;
    link: string;
    active: boolean;
}



export type userRegister = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
    
}

// export type AuthResponse = {
//   accessToken: string;        
//   tokenType: "Bearer";
//   user: userRegister;                 
// };


export type profileType={
  _id?: string,
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
  top_skills: [],
  achievement: [],
  public: boolean,
  showEmail: boolean,
  userId:string
}