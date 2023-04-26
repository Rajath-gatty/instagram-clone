import { User,Post } from "@prisma/client";

type safePost = Omit<Post, "createdAt"> & {
    createdAt: string
} 

type safeUser = Omit<
    User,
    "createdAt" | "updatedAt"
    > & {
        createdAt: string,
        updatedAt: string,
        posts?: safePost[]
}

type homePost = Omit<safePost, "userId"> & {
    user: {
        authorName: string,
        image: string,
        id: string
    }
}

type safeComment = {
    createdAt: string;
    id: string;
    title: string;
    userId: string;
    postId: string;
    user: {
        name: string | null;
        image: string | null;
    };
}

type PostModal = {
    postId: string,
    image: string
  }
