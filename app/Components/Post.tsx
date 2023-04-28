"use client"
import Image from "next/image";
import {useState,useEffect, useRef} from "react";
import {useForm } from "../hooks/useForm";
import {AiFillHeart} from "react-icons/ai";
import {FaRegComment} from "react-icons/fa";
import {TbBrandTelegram} from "react-icons/tb";
import {BsBookmark} from "react-icons/bs";
import { PostModal, homePost } from "../types";
import { formatDistanceToNow } from "date-fns";
import { useUserContext } from "../Context/UserContext";

interface PostProps {
    data: homePost,
    isLikedPost: boolean,
    fetchComments: (post: PostModal) => void
}

const Post = ({data,fetchComments,isLikedPost}:PostProps) => {
    const [isLiked,setIsliked] = useState(isLikedPost);
    const [totalLikes,setTotalLikes] = useState(data.likes);
    const [loading,setLoading] = useState(false);
    const [showHeartAnimation,setShowHeartAnimation] = useState(false);

    const {commentvalue,showPostBtn,handleChange,submit} = useForm(data.id);
    const {state,setLikedPost,unlikePost} = useUserContext();

    const commentInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
            setIsliked(state.likedPosts.includes(data.id));
    },[state.likedPosts])

    const dislikePost = async(id: string) => {
        if(loading) return;
            setIsliked(prev => !prev)
            unlikePost(id)
            setShowHeartAnimation(false);
            setTotalLikes(prev => --prev)
            setLoading(true);
            await fetch('/api/post/unlike',{
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({postId:id})
            })
            setLoading(false);
    }

    const likePost = async(id: string) => {
        if(loading) return;
        setIsliked(prev => !prev)
        setLikedPost(id)
        setShowHeartAnimation(true);
        setTotalLikes(prev => ++prev)
        setLoading(true);
        await fetch('/api/post/like',{
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({postId:id})
        })
        setLoading(false);
    }

    const handleLikeAndUnlike = async(id: string) => {
        if(isLiked) {
          await dislikePost(id);
        } else {
          await likePost(id);
        }
    }
    
    const handleDoubleTapLike = (id: string) => {
        if(isLiked) {
            return;
        } else {
            likePost(id);
        }
    }

  return (
    <div>
        <div className="flex gap-4 items-center mb-3">
            <Image src={data.user.image} className="rounded-full w-[45px] h-[45px]" alt="profile" width={40} height={40}/>
            <h1 className="text-white font-medium">{data.user.authorName}</h1>
            <p className="text-slate-500">{formatDistanceToNow(new Date(data.createdAt))}</p>
        </div>
        <div className="relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <AiFillHeart size={90} className={showHeartAnimation?`post-heart block`:`hidden`} color="#ececec" />
            </div>
            <Image 
            className="w-full" 
            src={data.ImageUrl} 
            width={300} 
            height={300} 
            alt="Profile"
            onDoubleClick={()=>handleDoubleTapLike(data.id)}
            />
        </div>
        <div className="p-4">
            <div className="flex justify-between mb-3">
                <div className="flex gap-4 ">
                    <div className="flex gap-6 justify-center align-center">
                        <span className="text-white text-lg">{totalLikes} likes</span>
                        <AiFillHeart 
                            className={isLiked?`heart-red`:`heart-outlined hover:opacity-50`} 
                            style={{cursor:"pointer"}}
                            size={30} 
                            onClick={()=> handleLikeAndUnlike(data.id)}
                        />
                    </div>
                    <FaRegComment 
                       size={30} 
                       color="#f2f2f2" 
                       className="cursor-pointer hover:opacity-50"
                       onClick={() => commentInputRef.current?.focus()}
                    />
                    <TbBrandTelegram  size={30} color="#f2f2f2"/>
                </div>
                <BsBookmark  size={30} color="#f2f2f2"/>
            </div>
            <div className="border-b border-slate-800 pb-5">
                <p className="text-white">{data.caption}</p>
                <span className="text-slate-400 mt-2 hover:text-slate-600 cursor-pointer" onClick={() => fetchComments({postId:data.id,image:data.ImageUrl})}>{data.totalComments>0?`view all ${data.totalComments} comments`:`0 comments`}</span>
                <div className="flex items-center justify-between">
                    <form onSubmit={submit}>
                        <input ref={commentInputRef} className="bg-gray-950 outline-none caret-slate-400 text-white mt-3" type="text" placeholder="Add a comment..." value={commentvalue} onChange={handleChange}/>
                        {showPostBtn&&<button className="bg-blue-500 text-white border-none cursor-pointer py-1 px-2 text-sm rounded">Post</button>}
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Post;