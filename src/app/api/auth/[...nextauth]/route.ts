import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import userLogin from "@/components/requests/loginUSer";
import { CredentialsLogin } from "@/components/interfaces";

const handler = NextAuth({
  providers: [
      GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
          authorization: {
              params: {
                  prompt: "consent",
                  response_type: "code"
              }
          }
      }),
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "email", type: "email", placeholder: "abc123@example.com" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials: CredentialsLogin | undefined, req: any) {
          if (credentials === undefined) {
            throw new Error("El objeto de credenciales no puede ser nulo");
          }
      
          try {
            const user = await userLogin(credentials);
            return user;
          } catch (error) {
            throw new Error("Error en la solicitud de autenticación: " + error.message);
          }
        },
      })      

  ],
  callbacks: {
    async signIn({ user, account }) {
      const { id, email } = user;
    
      if (!user.name || !user.email) {
        return false;
      }
    
      if (account.type === "oauth") {
        try {
          await userLogin({ email, googlePass: id });
          return true;
        } catch (error) {
          return false;
        }
      }
    
      return true;
    },
      async jwt({ token, user }) {
          return { ...token, ...user }
      },
      async session({ session, token }) {
        if (token.email && token.sub) {
          try {
            const newUser = await userLogin({ email: token.email, googlePass: token.id });
            token.picture = newUser.picture;
            session.user = {
              ...token,
              name: newUser.name,
              email: newUser.email,
              picture: newUser.picture,
              role: newUser.roleID,
              token: newUser.token
            };
      
            return session;
          } catch (error) {
            throw new Error("Usuario no autorizado");
          }
        }
      
        session.user = {
          name: token.name,
          email: token.email,
          picture: token.picture,
          token: token.token,
          role: token.role,
        };
      
        return session;
      },

  },
  pages: {
      signIn: "/",
      error: "/login"
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
      strategy: "jwt",

  }
});

export { handler as GET, handler as POST };

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//   ],

// });
// export { handler as GET, handler as POST };