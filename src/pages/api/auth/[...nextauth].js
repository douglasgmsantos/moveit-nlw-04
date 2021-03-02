import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: "520593160801-1b1dt66e25gster3rdi76nvndi0c3bim.apps.googleusercontent.com", //process.env.GOOGLE_ID,
      clientSecret: "uaamEOyfO7U0sfrZzy70KSgk" //process.env.GOOGLE_SECRET
    })
  ],
})