import NextAuth, { NextAuthOptions } from "next-auth"
import { SanityAdapter, SanityCredentials } from "next-auth-sanity"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import sanityClient from "./sanity"

export const authOptions:NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    SanityCredentials(sanityClient)
  ],
  session: {
    strategy: 'jwt'
  },
  adapter: SanityAdapter(sanityClient),
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
  callbacks:{

  }
}
