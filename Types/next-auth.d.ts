import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    accessToken?: string
    setupIncomplete?: boolean
  }
  interface Session {
    accessToken?: string
    setupIncomplete?: boolean
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
    setupIncomplete?: boolean
  }
}