import NextAuth, { getServerSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID_GOOGLE!,
      clientSecret: process.env.CLIENT_SECRET_GOOGLE!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          name: token.name,
          email: token.email,
          picture: token.picture,
          sub: token.sub,
        },
      };
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
    error: "/error",
  },
};

export const handler = NextAuth(options);
export const authSession = () => getServerSession(options);
