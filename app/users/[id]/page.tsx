import Image from "next/image";
import getUserById from "@/app/libs/getUserById";

interface ProfilePostProps {
  params: {
      id: any
  },
}

const ProfilePost = async({params:{id}}:ProfilePostProps) => {
  const selectedUser = await getUserById(id);

  let post;

  if(selectedUser?.posts?.length) {

    post =<div className="grid grid-cols-3 gap-1 w-full" >
      {selectedUser.posts.map((post: any) => {
      return (
        <Image key={post.id} src={post.ImageUrl} className="w-full max-w-[300px] max-h-[250px] h-full object-cover" alt="Profile" width={150} height={150} loading="lazy"/>
        )
      })}
    </div>
  } else {
    post = <h1 className="text-white text-center font-bold text-2xl mt-20">No posts yet</h1>
  }

  return post;
}

export default ProfilePost;

