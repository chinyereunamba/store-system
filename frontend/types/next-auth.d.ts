import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      account: {
        email: string | null;
        is_superuser: string | null;
        pk: number | null;
        username: string | null;
      };
      access: string;
      refresh: string;
      ref: number;
      iat: number;
      exp: number;
      jti: string;
    } & DefaultSession["user"];
  }
}
interface Account {
  provider: string;
  meta: Token;
  email: string;
  is_superuser: string;
  pk: number;
  username: string;
}
interface Token {
  account: Account;
  access: string;
  refresh: string;
  ref: number;
}
interface User {
  user: Account;
  access: string;
  refresh: string;
  ref: number;
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    token: Token;
    user: User;
    account: Account;
  }
}