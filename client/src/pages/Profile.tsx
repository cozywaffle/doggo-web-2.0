import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getOne } from "../redux/slices/users.slice";
import { AppDispatch, RootState } from "../redux/store";
import ErrorPage from "./ErrorPage";
import { Avatar } from "@mui/material";
import stringAvatar from "../utils/emptyAvatarGenerator";

const Profile: FC = () => {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const getUser = async () => {
      await dispatch(
        getOne({ id: parseInt(params?.id!), username: params?.username! }),
      );
    };
    getUser();
  }, [params]);
  const data = useSelector((state: RootState) => state.users.data);

  console.log((data?.userData?.username || "").toString());

  return (
    <>
      {data ? (
        <>
          <section className=" px-4 py-5 h-[100%] w-[100%] rounded-lg items-start flex gap-x-44">
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
                <Link
                  to="/me/edit"
                  className="flex justify-center p-2 transition-all rounded-md border-solid border border-white hover:text-black hover:bg-white hover:rounded-sm active:translate-y-[2px]">
                  Edit profile
                </Link>
              </div>
            </div>
            <div className="flex flex-col justify-start items-center bg-neutral-800">
              <div className="flex flex-col space-y-4">posts</div>
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
