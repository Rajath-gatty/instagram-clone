"use client"
import Image from "next/image";
import { safeComment } from "../types";
import { formatDistanceToNow } from "date-fns";

interface CommentProps {
  data: safeComment
}

const Comment = ({data}:CommentProps) => {
  return (
    <div className="border-b border-slate-700/50 p-1">
    <div className="flex gap-5 items-center p-2 ">
      <Image src={data.user.image? data.user.image : "/profile.jpg"} className="rounded-full w-[40px] h-[40px]" width={20} height={20} alt="Profile"/>
      <div>
        <h2 className="font-bold text-sm tracking-tight mb-1">{data.user.name}</h2>
        <p className="text-sm leading-tight">{data.title}</p>
        <p className="text-slate-500 text-sm">{formatDistanceToNow(new Date(data.createdAt))}</p>
      </div>
    </div>
  </div>
  )
}

export default Comment