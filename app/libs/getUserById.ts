import { safeUser } from "../types";
import { Post,User } from "@prisma/client";
import prisma from "../database/db";

export default async function getUserById (id: string): Promise<safeUser> {
    const res = await prisma?.user.findUnique({
      where:{
        id:id
      },
      include:{
        posts:true
      }
    }) as (User & {
      posts: Post[];
  })
    return {
      ...res,
      createdAt: res?.createdAt.toISOString(),
      updatedAt: res?.updatedAt.toISOString(),
      posts: res?.posts.map((post) => {
        return {
            ...post,
            createdAt: post.createdAt.toISOString()
        }
    })
    }
  }