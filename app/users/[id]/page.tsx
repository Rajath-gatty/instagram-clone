import Image from "next/image";
import getUserById from "@/app/libs/getUserById";
import { AiOutlineHeart } from "react-icons/ai";
import getCurrentUser from "@/app/libs/getServerSession";

interface ProfilePostProps {
  params: {
      id: any
  },
}

const ProfilePost = async({params:{id}}:ProfilePostProps) => {
  const currentUser = await getCurrentUser({posts:false});
  const selectedUser = await getUserById(id);

  let post;

  if(selectedUser?.posts?.length) {

    post =<div className="grid grid-cols-3 gap-1 w-full" >
      {selectedUser.posts.map((post: any) => {
      return (
        <div className="relative group" key={post.id}>
          <Image src={post.ImageUrl} className="w-full max-w-[300px] max-h-[200px] h-full object-cover" alt="Profile" width={150} height={150} loading="lazy"/>
          {id===currentUser?.id&&<div className="absolute group-hover:block hidden top-0  z-10 h-full right-0 bottom-0 left-0 bg-black/60">
            <div className="flex justify-center items-center gap-2 h-full">
              <AiOutlineHeart color="#fff" size={30}/>
              <p className="text-white text-center">{post.likes}</p>
            </div>
          </div>}
        </div>
        )
      })}
    </div>
  } else {
    post = <h1 className="text-white text-center font-bold text-2xl mt-20">No posts yet</h1>
  }

  return post;
}

export default ProfilePost;

