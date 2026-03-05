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
    id: number;
    name: string;  
    description: string;
    status: string;
    techstack: string[];
    lastUpdated: string;
    progress: number;
    link: string;
    active: boolean;
}