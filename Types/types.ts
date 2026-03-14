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
    _id: string;
    name: string;  
    description: string;
    status: string;
    techstack: string[];
    lastUpdated: string;
    progress: number;
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

export type AuthResponse = {
  accessToken: string;        // JWT token
  tokenType: "Bearer";
  user: userRegister;                 // user data
};