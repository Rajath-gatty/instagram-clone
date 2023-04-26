import { Post } from "@prisma/client";
import getCurrentUser from "./getServerSession";
import prisma from "../database/db";

export default async function getUserPosts() {
    const user = await getCurrentUser({posts:false});

    // const start = Date.now();
    const postAuthor = await prisma?.user.findMany({
        where: {
            id: {
                in: user?.following
            }
        },
        include: {
            posts: true,
        }
    })


    const updatedPostsArray = postAuthor?.reduce((acc: any,user) => {
        let accumulator = acc;
        if(user.posts.length>0) {
            const res = user.posts.map((post: Post) => {
                return {
                    user: {
                        authorName: user.name,
                        image: user.image,
                        id: user.id
                    },
                    id: post.id,
                    ImageUrl: post.ImageUrl,
                    caption: post.caption,
                    likes: post.likes,
                    totalComments:post.totalComments,
                    createdAt: post.createdAt.toISOString()
                }
            })
            accumulator.push(res);
        }
        return accumulator;
    },[]) 

    // console.log(updatedPostsArray.flat())

        
    // const end = Date.now();
    // const total = end-start;
    // console.log("Time to get Posts ",total);
    
    return updatedPostsArray.flat().reverse();

}