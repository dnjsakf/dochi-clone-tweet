import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import {NextResponse} from "next/server";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  pages: {
    signIn: '/i/flow/login',
    newUser: '/i/flow/signup',
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const authResponse = await fetch(`${process.env.AUTH_URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: credentials.username,
            password: credentials.password,
          }),
        })

        if (!authResponse.ok) {
          return null
        }

        const user = await authResponse.json()
        console.log('user', user);
        return {
          email: user.id,
          name: user.nickname,
          image: user.image,
          ...user,
        }
      },
    }),
  ],
  callbacks: {
    // async authorized({ request, auth }){ // move to 'middleware.ts'
    //   if( !auth ){
    //     return NextResponse.redirect(`http://localhost:3000/i/flow/login`);
    //   }
    //   return true;
    // },
    session({ session, newSession }) {
      console.log('auth.ts session', session, newSession)
      return session
    },
  },
  events: {
    session(data) {
      console.log(
        'auth.ts events session',
        'session' in data && data.session,
        'token' in data && data.token,
      )
    },
  }
});