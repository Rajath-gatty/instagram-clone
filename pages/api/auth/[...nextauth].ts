import NextAuth,{ AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../app/database/db"
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
    ],
    callbacks: {
        async jwt({ token, account, user}) {
            // Persist the OAuth access_token and or the user id to the token right after signin
            if (account) {
              token.id = user.id
            }
            return token
          },
        async session({ session, token, user }) {

            // Send properties to the client, like an access_token and user id from a provider.
            if(session?.user) {
                session.user.id = token.id as string
            }
            return session;
          }
      },
    pages: {
        signIn:'/'
    },
    session:{
        strategy:'jwt',
    },
    secret:process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions);