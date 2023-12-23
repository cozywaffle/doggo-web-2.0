import { FC, useEffect, useState } from "react";
import axios from "../utils/axios";
import { IPost } from "../redux/slices/types";
import Post from "../components/Post";
import Masonry from "@mui/lab/Masonry";

const Main: FC = () => {
  const [posts, setPosts] = useState<IPost[] | null>(null);
  useEffect(() => {
    const getPosts = async () => {
      const { data } = await axios.get("posts/getall");
      if (data) setPosts(data);
    };
    getPosts();
  }, []);

  console.log(posts);

  return (
    <main className="w-[95%] h-full px-4 py-2 flex flex-col justify-start items-center">
      <section className="flex w-[1300px] p-4 bg-neutral-800 bg-opacity-95 rounded-2xl ">
        <Masonry columns={2} spacing={1}>
          {posts ? (
            posts.map(post => (
              <Post
                key={post.id}
                props={{
                  id: post.id,
                  content: post.content,
                  tags: post.tags,
                  image_url: post.image_url,
                  author: post.author,
                  likes: post.likes,
                  dislikes: post.dislikes,
                  created_at: post.created_at,
                  updated_at: post.updated_at,
                  authorId: post.authorId,
                }}
              />
            ))
          ) : (
            <h1>nothing</h1>
          )}
        </Masonry>
      </section>
    </main>
  );
};

export default Main;
