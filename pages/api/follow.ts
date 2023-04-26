import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if(req.method==="POST") {
       const {followId} = req.body;

        const cookie = req.headers.cookie;
        const currentUser = await getSession({req: {headers: {cookie}}});

        if(!followId || !currentUser) {
            return res.status(401).json({msg: "Unauthorized"})
        }

        try {
            await prisma?.user.update({
                where: {
                    id: currentUser?.user.id
                },
                data:{
                    following: {
                        push: followId
                    },
                    followingCount: {
                        increment: 1
                    }
                }
            })

            await prisma?.user.update({
                where: {
                    id: followId
                },
                data:{
                    followers: {
                        push: currentUser?.user.id
                    },
                    followersCount: {
                        increment: 1
                    }
                }
            })
            res.json({success:true})
        } catch(err) {
            res.status(500).json({error:true})
        }


    }
}