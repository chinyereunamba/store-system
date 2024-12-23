import CredentialsProvider from "next-auth/providers/credentials";
const getCurrentEpochTime = (): number => {
  return Math.floor(new Date().getTime() / 1000);
};

const BACKEND_ACCESS_TOKEN_LIFETIME = 60 * 60; // 60 minutes
// const BACKEND_REFRESH_TOKEN_LIFETIME = 7 * 24 * 60 * 60; // 1 day

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@mail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials,) {
        const res = await fetch(`${process.env.NEXT_BACKEND_URL}/user/login/`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }),
  ],
  jwt: {
    maxAge: 60 * 60 * 24 * 2,
  },
  pages: {
    signIn: "/login",
    signOut: "/logout",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, email, credentials }: any) {
      return true;
    },
    async redirect({ url, baseUrl }: any) {
      return baseUrl;
    },
    async session({ token, session }:any) {
      session.user = token;
      return session;
    },
    async jwt({ token, user, account }:any) {
      if (user && account) {
        token["account"] = user.user;
        token["access"] = user.access;
        token["refresh"] = user.refresh;
        token["ref"] = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
        return token;
      }
      else if (getCurrentEpochTime() > token["ref"]) {
        try {
          const response = await fetch(
            `${process.env.NEXT_BACKEND_URL}/user/token/refresh/`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ refresh: token["refresh"] }),
            }
          );

          if (response.ok) {
            const data = await response.json();
            token["access"] = data.access;
            token["refresh"] = data.refresh;
            token["ref"] =
              getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
          } else {
            console.error("Failed to refresh token:", response.statusText);
          }
        } catch (error) {
          console.error("Error during token refresh:", error);
          return {}
        }
      }
      return token;
    },
  },
};

export default authOptions;
