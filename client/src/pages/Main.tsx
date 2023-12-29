import { FC, useEffect, useState } from "react";
import { IPost } from "../redux/slices/types";
import Post from "../components/Post";
import Masonry from "@mui/lab/Masonry";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../redux/slices/posts.slice";
import { AppDispatch, RootState } from "../redux/store";

import Sorting from "../components/Sorting";

const Main: FC = () => {
  const data = useSelector((state: RootState) => state.posts.data);
  const [posts, setPosts] = useState<IPost[] | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (data) return;

    const getPosts = async () => {
      await dispatch(getAll());
    };
    getPosts();
  }, []);

  useEffect(() => {
    setPosts(data);
  }, [data]);

  console.log(posts);

  return (
    <main className="w-[95%] h-full px-4 py-2 flex flex-col justify-start items-center">
      <section className="flex flex-col w-[1300px] p-4 bg-neutral-800 bg-opacity-95 rounded-2xl ">
        <div className="flex items-center justify-between p-1 pb-3">
          <h1 className="text-white font-bold text-xl">Publications:</h1>
          <Sorting />
        </div>
        {posts?.length ? (
          <Masonry columns={2} spacing={1}>
            {posts.map(post => (
              <Post
                key={post.id}
                props={{
                  id: post.id,
                  title: post.title,
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
            ))}
          </Masonry>
        ) : (
          <div className="p-4 flex justify-center text-center text-2xl font-thin">
            <div className="flex h-96 items-center justify-center text-orange-400 underline text-4xl font-semibold">
              No posts yet!
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Main;
