import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    if(req.method==="POST") {
        const {postId,comment} = req.body;

        const cookie = req.headers.cookie;
        const sessionUser = await getSession({req:{headers:{cookie}}});

        if(!sessionUser) {
           return res.status(401).json({msg:"Unauthorized"});
        };

        try {
            await prisma?.comment.create({
                data: {
                    userId: sessionUser.user.id,
                    postId: postId,
                    title: comment,
                }
            })

            await prisma?.post.update({
                where: {
                    id: postId
                },
                data:{
                    totalComments: {
                        increment: 1
                    }
                }
            })

            res.json({success:true});

        } catch(err) {
            res.status(500).json({msg:"Something went wrong"})
        }

    }
}