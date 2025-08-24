// lib/auth.ts
import { prisma } from "@/lib/prisma";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) return null;

        // Return the user object which includes id and storeName
        return user;
      },
    }),
  ],
  callbacks: {
    // The user object here comes from the authorize function
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.storeName = user.storeName;
      }
      return token;
    },
    // The session object is what the client receives
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.storeName = token.storeName as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};
