// lib/auth.ts
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        const valid = await bcrypt.compare(credentials.password, user.password);
        if (!valid) return null;

        // return minimal user info
        return { id: user.id, email: user.email, storeName: user.storeName };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // @ts-ignore - next-auth token typing augmentation omitted for brevity
        token.id = (user as any).id ?? token.id;
        // @ts-ignore
        token.storeName = (user as any).storeName ?? token.storeName;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        // @ts-ignore
        session.user = { ...(session.user ?? {}), id: token.id, storeName: token.storeName };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
