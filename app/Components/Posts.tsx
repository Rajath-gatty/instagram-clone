"use client"
import Image from "next/image";
import { PostModal, homePost, safeComment, safeUser } from "../types";
import Modal from "./Modal";
import Post from "./Post";
import {useState, useEffect} from "react";
import Comment from "./Comment";
import useForm from "../hooks/useForm";
import { useUserContext } from "../Context/UserContext";

interface PostsProps {
  homePosts: homePost[],
  currentUser: safeUser
}

const Posts = ({homePosts,currentUser}:PostsProps) => {
  const [showModal, setShowModal] = useState(false);
  const [comments,setComments] = useState<safeComment[] | undefined>([]);
  const [post,setPost] = useState<PostModal | null>(null);
  const [loading, setLoading] = useState(false);

  const {setCurrentUser} = useUserContext();
  const {submit,handleChange,showPostBtn,commentvalue,loading:formLoading} = useForm(post?.postId as string,setComments);

  useEffect(() => {
    setCurrentUser(currentUser);
  },[])

  const handleCloseModal = () => {
    setShowModal(false);
    setPost(null);
  }

  const fetchComments = async(post:PostModal) => {
    setLoading(true);
    setPost(post);
    setShowModal(true);

    const res = await fetch(`/api/comments/${post.postId}`,{
      next: {
        revalidate: 10
      }
    })

    const result:safeComment[] = await res.json();
    setLoading(false);
    setComments(result);
  }

  return (
    <div className="max-w-xl mx-auto mt-8">
      {
        homePosts?.map(post => {
          return <Post data={post} key={post.id} fetchComments={fetchComments} isLikedPost={currentUser.likedPosts.some(id => id === post.id)} />
        })
      }
      <Modal showModal={showModal} closeModal={handleCloseModal} width="max-w-[300px] md:max-w-5xl">
          <div className="flex flex-col md:flex-row w-full h-full ">
            <div className="flex-1 bg-gray-800">
             <Image src={post?.image?post.image:"/profile.jpg"} className="object-contain w-full md:h-full max-h-[200px] md:max-h-none" width={300} height={300} alt="Post"/>
            </div>
            <div className="flex-1 text-white h-full relative border-l bg-gray-800 border-slate-700">
              <h1 className="text-lg font-medium border-b border-slate-700 p-3">Comments</h1>
              <div className="px-4 overflow-y-auto h-[350px] md:h-[450px] mb-[45px] scrollbar-style">
              {loading?<h1 className="text-center mt-12 text-md text-white">Loading...</h1>
              :
               comments?.length!>0? comments?.map(comment => {
                  return <Comment key={comment.id} data={comment}/>
                  })
                  :<p className="text-center text-slate-500 mt-16">No comments yet</p>
 
                }
              </div>
              <div className="bottom-1 left-0 absolute border-t border-slate-700 w-full -mb-1">
                  <form className="flex" onSubmit={submit}>
                    <input type="text" onChange={handleChange} value={commentvalue} placeholder="Add a comment" className="p-4 w-full bg-slate-800 text-white text-sm outline-none" />
                    {showPostBtn&&<button type="submit" className="bg-transparent text-blue-300 mr-4">{formLoading?"Posting...": "Post"}</button>}
                  </form>
              </div>
            </div>
          </div>
      </Modal>
    </div>
  )
}

export default Posts;