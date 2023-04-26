
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../app/database/db";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const cookie = req.headers.cookie;
    const session = await getSession({req:{headers:{cookie}}});

    if(!session) {
        return res.status(401).json({msg: "Unauthorized"});
    }
    const loggedInUser = await prisma?.user.findUnique({
        where: {
            id: session.user.id
        }
    })
    if(!loggedInUser) {
        return res.status(401).json({msg: "Unauthorized"});
    }
    res.json(loggedInUser);
}