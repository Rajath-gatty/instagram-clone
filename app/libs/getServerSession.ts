import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

import prisma from "../database/db";

interface GetSessionProps {
    posts: boolean
}

const getSession = async () => {
    return await getServerSession(authOptions);
}

export default async function getCurrentUser({posts}:GetSessionProps) {
    try {
        const session = await getSession();

        if(!session?.user?.email) {
            return null
        }

        if(!posts) {
            const currentUser = await prisma.user.findUnique({
                where:{email: session.user.email},
            })
            if(!currentUser) {
                return null;
            }
    
            return {...currentUser,
                createdAt:currentUser.createdAt.toISOString(),
                updatedAt:currentUser.updatedAt.toISOString()
            };
        } else {
            const currentUser = await prisma.user.findUnique({
                where:{email: session.user.email},
                include:{
                    posts:true
                }
            })
            if(!currentUser) {
                return null;
            }
            
            return {...currentUser,
                createdAt:currentUser.createdAt.toISOString(),
                updatedAt:currentUser.updatedAt.toISOString(),
                posts: currentUser.posts.map(post => {
                    return {
                        ...post,
                        createdAt: post.createdAt.toISOString()
                    }
                })
            };
        }

    } catch(err:any) {
        return null;
    }
}