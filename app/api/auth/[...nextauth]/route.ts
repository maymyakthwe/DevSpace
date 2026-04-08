import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await fetch(
            process.env.NEXT_PUBLIC_API_URL + "/auth/login",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            }
          )
          const data = await response.json()
          if (!response.ok) return null
          return {
            id: data.access_token,
            accessToken: data.access_token,
            setupIncomplete: false,
          }
        } catch {
          return null
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "credentials") return true
      try {
        console.log("API URL:", process.env.API_URL)
        const response = await fetch(
          process.env.API_URL + "/auth/oauth",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: user.email,
              fullname: user.name,
              provider: account?.provider,
            }),
          }
        )
        console.log("FastAPI response status:", response.status) 
        const data = await response.json()
        console.log("FastAPI response data:", data)
        user.accessToken = data.access_token
        user.setupIncomplete = data.setup_incomplete 
        return true
      } catch (error) {
        console.error("OAuth error:", error)
        return false
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken
        token.setupIncomplete = user.setupIncomplete 
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string
      session.setupIncomplete = token.setupIncomplete as boolean 
      return session
    },
  },
})

export { handler as GET, handler as POST }