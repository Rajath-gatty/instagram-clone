import { Suspense } from "react";
import Posts from "./Components/Posts";
import getUserPosts from "./libs/getUserPosts";
import { homePost, safeUser } from "./types";
import getCurrentUser from "./libs/getServerSession";
import Skeleton from "./Components/UI/Skeleton";

const HomePage = async() => {
  const posts: homePost[] =  await getUserPosts();
  const currentUser = await getCurrentUser({posts:false});

  return (
      <div className="p-3 w-full">
        <Suspense fallback={<div className="max-w-xl mx-auto"><Skeleton count={3}/></div>}>
          <Posts homePosts={posts} currentUser={currentUser as safeUser}/>
        </Suspense>
      </div>
  )
}

export default HomePage;