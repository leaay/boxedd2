import NextAuth, { type NextAuthOptions } from "next-auth";


// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from "../../../env/server.mjs";
import CredentialProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {

  // callbacks: {
  //   session({ session, user }) {
  //     if (session.user) {
  //       session.user.id = user.id;
  //     }
  //     return session;
  //   },
  //   jwt({ token, user }:any) {
     
  //     if (user) {
  //       token.id = user.id
  //     }
  //     return token
  //   }
  // },
  // jwt:{
  //   secret: 'test',
    
  // },


  providers: [
      CredentialProvider({
        name: 'login',
        credentials: {
          email: { label: "Email", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" },
        },
        authorize: (credentials , req) => {
          if(credentials?.email === 'admin' && credentials?.password === '123456'){
            return{
              id: 1,
              name: 'admin',
              email: 'admin',
            }
          }
          return null
        },
      }),
  ],

  callbacks:{
    jwt: ({token,user})=>{
      if(user){
        token.id = user.id
      }
      return token
    },
    session: ({session,token})=>{
      if(token){
        session.id = token.id
      }
      return session
    }
  },
  secret:'test',
  jwt:{
    secret: 'test',
   
  },
  events:{
    async signIn(message){
      console.log(message)
    }
  }
};

export default NextAuth(authOptions);



// async (credentials) => {
//   const user = await prisma.user.findFirst({
//     where: {
//       email: credentials.email,
//       password: credentials.password,
//     },
//   });
//   if (user) {
//     return user;
//   } else {
//     return null;
//   }
// }