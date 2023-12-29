import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/axios";
import { IPost } from "../redux/slices/types";

const PostPage: FC = () => {
  const { id } = useParams();
  const [post, setPost] = useState<IPost | null>(null);

  useEffect(() => {
    if (!id) return;

    const getPost = async () => {
      const { data } = await axios.get(`posts/${id}`);

      if (!data) return;
      setPost(data);
    };

    getPost();
  }, []);

  return (
    <>
      {post ? (
        <div className="w-[850px] mx-auto my-4 flex flex-col justify-center items-center p-4 rounded-lg bg-neutral-800 shadow-2xl s">
          <div className="bg-neutral-800 p-2 rounded-lg">
            {post.image_url && (
              <div className="flex items-center justify-center">
                <img
                  src={post.image_url}
                  alt=""
                  className="w-screen h-fit rounded-lg"
                />
              </div>
            )}
            <div className="flex items-center justify-between w-full text-sm font-thin p-1 opacity-50">
              <h1>@{post.author.username}</h1>
              <h5 className="flex w-[50%] font-thin opacity-50 text-sm truncate">
                {post.tags.map((tag: string, index) => (
                  <p key={post.authorId + index} className="p-1">
                    #{tag}
                  </p>
                ))}
              </h5>
              <h2>{post.updated_at.toLocaleString()}</h2>
            </div>
            <h1 className="text-lg font-bold p-1">{post.title}</h1>
            <p className="truncate w-[500px] text-md font-normal p-1">
              {post.content}
            </p>
            <div className="flex justify-between items-center w-full px-2">
              <div className="flex items-center gap-1 text-sm font-thin opacity-30"></div>
              <div></div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default PostPage;
