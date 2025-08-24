// next-auth.d.ts
import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  /**
   * The shape of the user object returned in the session.
   */
  interface Session {
    user: {
      id: string;
      storeName: string;
    } & DefaultSession["user"];
  }

  /**
   * The shape of the user object returned from the authorize function.
   */
  interface User {
    storeName: string;
  }
}

declare module "next-auth/jwt" {
  /**
   * The shape of the JWT token.
   */
  interface JWT {
    id: string;
    storeName: string;
  }
}
