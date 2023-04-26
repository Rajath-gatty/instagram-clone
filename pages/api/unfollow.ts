import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if(req.method==="POST") {
       const {unFollowId} = req.body;

        const cookie = req.headers.cookie;
        const currentUser = await getSession({req: {headers: {cookie}}});

        if(!unFollowId || !currentUser) {
            return res.status(401).json({msg: "Unauthorized"})
        }

        try {
            const curUser = await prisma?.user.findUnique({
                where:{
                    id:currentUser.user.id
                }
            })
            const updatedFollowing = curUser?.following.filter(id => id !== unFollowId);
            await prisma?.user.update({
                where: {
                    id: currentUser?.user.id
                },
                data:{
                    following: updatedFollowing,
                    followingCount: {
                        decrement:1
                    }
                }
            })

            const unFollowerdUser = await prisma?.user.findUnique({
                where: {
                    id: unFollowId
                },
                select: {
                    followers:true,
                }
            })

            const updatedUnFollowerdUserFollowing = unFollowerdUser?.followers.filter(id => id !== currentUser.user.id)

            await prisma?.user.update({
                where: {
                    id: unFollowId
                },
                data:{
                    followers: updatedUnFollowerdUserFollowing,
                    followersCount: {
                       decrement: 1
                    }
                }
            })
            res.json({success:true})
        } catch(err) {
            res.status(500).json({error:true})
        }


    }
}