import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getOne } from "../redux/slices/users.slice";
import { AppDispatch, RootState } from "../redux/store";
import ErrorPage from "./ErrorPage";
import { Avatar } from "@mui/material";
import stringAvatar from "../utils/emptyAvatarGenerator";
import { IPost } from "../redux/slices/types";
import Post from "../components/Post";

const Profile: FC = () => {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [posts, setPosts] = useState<IPost[] | null>(null);

  useEffect(() => {
    const getUser = async () => {
      await dispatch(
        getOne({ id: parseInt(params?.id!), username: params?.username! }),
      );
    };
    getUser();
  }, [params]);

  const data = useSelector((state: RootState) => state.users.data);

  useEffect(() => {
    if (!data?.posts) return;

    setPosts(data.posts);
  }, [data]);

  const loggedUser = useSelector((state: RootState) => state.auth.data);
  console.log(loggedUser);

  console.log(data);

  console.log(loggedUser?.id == params.id);

  return (
    <>
      {data ? (
        <>
          <section className=" px-4 py-5 h-[100%] w-[100%] rounded-lg items-start flex gap-x-28">
            <div className="bg-neutral-800 rounded-xl py-2 flex flex-col justify-start items-center space-y-1 w-[350px] h-[100%]">
              {data.userData?.avatar_url ? (
                <img
                  className="w-[300px] h-[300px] rounded-full bg-cover border-2 shadow-sm shadow-black"
                  src={data?.userData.avatar_url}
                  alt="profile picture"
                />
              ) : (
                <Avatar
                  className="w-[300px] h-[300px] rounded-full bg-cover shadow-sm shadow-black text-9xl"
                  {...stringAvatar((data?.userData?.username || "").toString())}
                />
              )}
              <div className="space-y-4 flex flex-col items-center">
                <div>
                  <h1 className="text-2xl font-semibold">
                    {data.userData?.username}
                  </h1>
                </div>
                {loggedUser?.id == params.id ? (
                  <Link
                    to="/me/edit"
                    className="flex justify-center p-2 transition-all rounded-md border-solid border border-white hover:text-black hover:bg-white hover:rounded-sm active:translate-y-[2px]">
                    Edit profile
                  </Link>
                ) : (
                  <button className="flex justify-center p-2 transition-all rounded-md border-solid border border-white hover:text-black hover:bg-white hover:rounded-sm active:translate-y-[2px]">
                    follow
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-col justify-start items-center bg-neutral-800 rounded-md bg-opacity-70">
              <div className="p-2 flex flex-col space-y-4">
                {posts ? (
                  posts.map(post => (
                    <div className="max-w-3xl">
                      <Post
                        key={post.id}
                        props={{
                          id: post.id,
                          title: post.title,
                          content: post.content,
                          tags: post.tags,
                          image_url: post.image_url,
                          author: data.userData!,
                          likes: post.likes,
                          dislikes: post.dislikes,
                          created_at: post.created_at,
                          updated_at: post.updated_at,
                          authorId: post.authorId,
                        }}
                      />
                    </div>
                  ))
                ) : (
                  <>
                    <h1></h1>
                  </>
                )}
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          <ErrorPage />
        </>
      )}
    </>
  );
};

export default Profile;
