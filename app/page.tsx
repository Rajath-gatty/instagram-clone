import { Suspense } from "react";
import Posts from "./Components/Posts";
import getUserPosts from "./libs/getUserPosts";
import { homePost, safeUser } from "./types";
import getCurrentUser from "./libs/getServerSession";

const HomePage = async() => {
  const posts: homePost[] = await getUserPosts();
  const currentUser = await getCurrentUser({posts:false});

  return (
      <div className="p-3">
        <Suspense fallback={<p className="text-center text-white">Loading...</p>}>
          <Posts homePosts={posts} currentUser={currentUser as safeUser}/>
        </Suspense>
      </div>
  )
}

export default HomePage;