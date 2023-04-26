import formidable from "formidable";
import uploadFile from "@/app/libs/blobStorage";
import { PassThrough } from "stream";
import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../app/database/db";

export const config = {
   api: { bodyParser:false}
}

export default async function handler(req:NextApiRequest,res:NextApiResponse) {

    if(req.method==="POST") {

        const cookie = req.headers.cookie;
        const currentUser = await getSession({req:{headers:{cookie}}});

        const handleBlobUpload = (file:any): void => {
            const pass: any = new PassThrough();
            uploadFile(pass,file.newFilename,"posts")
            .then(res => {
                console.log(res);
            })

            return pass;
        }

        const options: any = {
            keepExtensions:true,
            fileWriteStreamHandler: handleBlobUpload
        }

        const form = formidable(options);

        await new Promise<void>((resolve,reject) => {
            form.parse(req,async(err,fields,files:any) => {
                if(err) {
                    reject(err)
                }
                const imageUrl = `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME as string}.blob.core.windows.net/posts/${files.file.newFilename}`;

                await prisma?.post.create({
                    data:{
                        ImageUrl:imageUrl,
                        likes:0,
                        userId:currentUser?.user.id as string,
                        caption: fields.caption as string
                    }
                })

                await prisma?.user.update({
                    where: {
                        id: currentUser?.user.id
                    },
                    data:{
                        totalPosts: {
                            increment:1
                        }
                    }
                })
                res.json({success:true})
                return resolve();
            })
        })
        .catch(err => {
            return res.status(500).json({error:true})
        })
    }
}