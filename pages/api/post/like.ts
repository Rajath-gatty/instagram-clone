import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../app/database/db";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if(req.method==="POST") {
        const {postId} = req.body;
        const cookie = req.headers.cookie;
        const session = await getSession({req:{headers:{cookie}}});

        if(!session) {
            return res.status(401).json({msg:"unauthorized"})
        }

        try {
            await prisma?.user.update({
                where: {
                    id: session.user.id
                },
                data: {
                    likedPosts: {
                        push: postId
                    }
                }
            })

            await prisma?.post.update({
                where: {
                    id: postId
                },
                data: {
                    likes: {
                        increment: 1
                    }
                }
            })

            res.json({success:true})

        } catch(err) {
            res.status(500).json({msg:"Something went wrong"})
        }

    }
}