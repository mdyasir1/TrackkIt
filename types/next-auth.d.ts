// types/next-auth.d.ts
import { DefaultSession } from "next-auth";
import { User as CustomUser } from "@/types"; // Imports your User type from index.ts

declare module "next-auth" {
  /**
   * The shape of the user object returned in the session.
   */
  interface User extends CustomUser {}

  /**
   * The shape of the session object.
   */
  interface Session {
    user: CustomUser & DefaultSession["user"];
  }
}
