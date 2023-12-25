import { FC, useEffect, useState } from "react";
import { IPost } from "../redux/slices/types";
import Post from "../components/Post";
import Masonry from "@mui/lab/Masonry";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../redux/slices/posts.slice";
import { AppDispatch, RootState } from "../redux/store";
import { Button, ButtonGroup } from "@mui/material";

const Main: FC = () => {
  const [posts, setPosts] = useState<IPost[] | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const getPosts = async () => await dispatch(getAll());
    getPosts();
  }, []);

  const data = useSelector((state: RootState) => state.posts.data);

  useEffect(() => {
    if (!data) return;
    setPosts(data);
  }, [data]);

  console.log(posts);

  return (
    <main className="w-[95%] h-full px-4 py-2 flex flex-col justify-start items-center">
      <section className="flex flex-col w-[1300px] p-4 bg-neutral-800 bg-opacity-95 rounded-2xl ">
        <div className="flex items-center justify-between p-1 pb-3">
          <h1 className="text-white font-bold text-xl">Publications:</h1>
          <div className="flex items-center gap-4">
            <ButtonGroup variant="text" color="warning">
              <Button color="warning">Popular</Button>
              <Button color="warning">Most liked</Button>
              <Button color="warning">Most disliked</Button>
              <Button color="warning">Latest</Button>
              <Button color="warning">Folowing</Button>
            </ButtonGroup>
          </div>
        </div>
        <Masonry columns={2} spacing={1}>
          {posts ? (
            posts.map(post => (
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
            ))
          ) : (
            <div className="text-center text-2xl font-thin">
              <h1>There's no publications yet!</h1>
            </div>
          )}
        </Masonry>
      </section>
    </main>
  );
};

export default Main;
