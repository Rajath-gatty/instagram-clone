import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../app/database/db";

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    if(req.method==="POST") {

      const {query}=  req.body;
      const cookie = req.headers.cookie
      const session = await getSession({req:{ headers: { cookie } }});

      try {
        const result = await prisma?.user.findMany({
          where: {
             AND:{
              name: {
                startsWith: query,
                mode:"insensitive"
            },
            id:{
              not:{
                equals:session?.user.id
              }
            }
             } 
          }
        })
        res.json(result);
      } catch(err) {
        console.log("Error.......",err);
        res.status(500).json({error:true,msg:"Something went wrong"});
      }
    } 
}   