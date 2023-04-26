import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
        const {postId} = req.query;

        try {
            const comments = await prisma?.comment.findMany({
                where: {
                    postId: postId as string
                },
                include: {
                    user: {
                        select: {
                            name: true,
                            image: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })
        
            const result = comments?.map(comment => {
                return {
                    ...comment,
                    createdAt: comment.createdAt.toISOString()
                }
            })

            res.json(result)
    

        } catch(err) {
            res.status(500).json({msg: "Something went wrong"});
        }
}