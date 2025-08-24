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
        // @ts-expect-error - next-auth token typing augmentation omitted for brevity
        token.id = (user as string).id ?? token.id;
        // @ts-expect-error: This is needed because the library's types are incorrect.
        token.storeName = (user as string).storeName ?? token.storeName;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        // @ts-expect-error: This is needed because the library's types are incorrect.
        session.user = {
          ...(session.user ?? {}),
          id: token.id,
          storeName: token.storeName,
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
