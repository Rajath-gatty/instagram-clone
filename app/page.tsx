import Posts from "./Components/Posts";
import getUserPosts from "./libs/getUserPosts";
import { homePost } from "./types";

const HomePage = async({session}:{session:any}) => {
  const posts: homePost[] = await getUserPosts();
  return (
      <div className="p-3">
          <Posts homePosts={posts}/>
      </div>
  )
}

export default HomePage;