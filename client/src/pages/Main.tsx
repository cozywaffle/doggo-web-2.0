import { FC, useEffect, useState } from "react";
import axios from "../utils/axios";
import { IPost } from "../redux/slices/types";

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
    <main className="bg-neutral-800 bg-opacity-95 rounded-2xl w-[95%] h-full px-4 py-2 flex flex-col justify-start items-center">
      <div className="my-1"></div>
    </main>
  );
};

export default Main;
