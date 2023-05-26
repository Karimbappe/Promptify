import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { connectToDB } from "@utils/database";
import User from "@models/user";


const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({ session }){
            // store the user id from MongoDB to session
            const sessionUser = await User.findOne({
                email: session.user.email
            })
    
            session.user.id = sessionUser._id.toString();
            return session;
            // to know which user is currently online
        },
        async signIn({ profile }){
            try {
                // serverless -> Lambda -> dynamodb
                await connectToDB();
                // Check if a user already exists
                    const userExists = await User.findOne({ email: profile.email })
                // If not create a new user and save it into the database
                    if (!userExists) {
                        await User.create({
                            email: profile.email,
                            username: profile.name.replace(" ", "").toLowerCase(), 
                            // remove spaces and put it in lower case
                            image: profile.picture
                        })
                    }
    
                return true;
            } catch (error) {
                console.log(error)
                return false;
            }
        }
    }
})

{/* NOT HOW WE USUALLY DO BUT THIS IS THE WAY TO DO IT IN NEXT FROM OFFICIAL DOC */}

export { handler as GET, handler as POST }