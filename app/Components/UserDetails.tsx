"use client"
import Image from "next/image"
import NavMenu from "../users/[id]/NavMenu"
import { safeUser } from "../types"
import { useState,useEffect } from "react"

interface UserDetailsProps {
    loggedInUser:boolean,
    user: safeUser | null,
    currentUser: safeUser | null
    children?: React.ReactNode,
    showBookmarks: boolean
}

const UserDetails = ({loggedInUser,user,children,showBookmarks,currentUser}:UserDetailsProps) => {
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        if(!user) return;

        if(currentUser?.following.includes(user.id)) {
            setIsFollowing(true);
        } else {
            setIsFollowing(false);
        }

    },[])

    if(!user) return <p>Something went wrong</p>

    const handleFollow = async() => {
       if(user.id === currentUser?.id ) return;
       try {
            await fetch('/api/follow',{
                method: "POST",
                headers: {
                    "content-type":"application/json"
                },
                body: JSON.stringify({followId:user.id})
            })
   
            setIsFollowing(true);
       } catch(err) {
        console.log(err);
       }
    }

    const handleUnFollow = async() => {
        if(user.id === currentUser?.id ) return;
        try {
             await fetch('/api/unfollow',{
                 method: "POST",
                 headers: {
                     "content-type":"application/json"
                 },
                 body: JSON.stringify({unFollowId:user.id})
             })

             setIsFollowing(false);
        } catch(err) {
         console.log(err);
        }
     }

  return (
    <div className="mt-8 max-w-3xl mx-auto">
        <div className="flex justify-center md:gap-20 gap-12 p-4 border-b border-slate-800 pb-12">
            <div className="flex justify-center items-center">
                <Image 
                src={user?.image||"/profile.jpg"} className="md:w-[120px] md:h-[120px] w-[90px] h-[90px] rounded-full " alt="Profile" width={120} height={120} />
            </div>
            <div>
                <div className="flex flex-col md:flex-row md:items-center gap-8 mb-5">
                    <p className="text-white">{user?.name}</p>
                    
                    {!(loggedInUser || isFollowing)
                    &&
                    <button className="border-none bg-blue-400 rounded py-1 px-5 text-white" onClick={handleFollow}>Follow</button>}

                    {isFollowing
                    &&
                    <div className="flex gap-3">
                        <button className="px-2 py-1 text-gray-900 bg-gray-200 font-medium rounded cursor-auto">Following</button>
                        <button className="border border-red-700 bg-transparent rounded py-1 px-3 text-red-700" onClick={() => {handleUnFollow()}}>unfollow</button>
                    </div>
                    }

                </div>
                <div className="flex gap-6 mb-5 text-white">
                    <div className="flex md:gap-2 md:flex-row flex-col justify-center"><p className="text-center">{user.totalPosts}</p> <p>Posts</p></div>
                    <div className="flex md:gap-2 md:flex-row flex-col justify-center"><p className="text-center">{user?.followersCount} </p><p>followers</p></div>
                    <div className="flex md:gap-2 md:flex-row flex-col justify-center"><p className="text-center">{user?.followingCount} </p><p>following</p></div>
                </div>
                <p className="text-white">{user?.name?.toUpperCase()}</p>
            </div>
        </div>
        
        <div>
            <NavMenu showBookmarks={showBookmarks} userId={user?.id}/>
            {children}
        </div>
    </div>
  )
}

export default UserDetails;