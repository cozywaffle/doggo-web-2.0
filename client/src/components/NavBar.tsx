import { FC } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../redux/slices/auth.slice";
import { RootState } from "../redux/store";
import initialAvatar from "../assets/initial.jpg";
import logo from "../assets/shiba-logo.png";

const NavBar: FC = () => {
  const isAuth = useSelector(selectIsAuth);

  const data = useSelector((state: RootState) => state.auth.data);

  console.log(data);

  return (
    <header className="flex  border-b-2 border-neutral-900 justify-between py-2 px-4">
      <Link
        to="/"
        className="flex flex-row items-center font-header text-2xl font-thin text-orange-300">
        <h1>Doggo</h1>
        <img src={logo} alt="logo" className="h-[35px]" />
      </Link>
      <div className="flex gap-x-4 items-center">
        {isAuth ? (
          <>
            {isAuth && (
              <Link
                to={`/${data?.id}/${data?.username}`}
                className="flex items-center gap-x-2 text-xl font-thin">
                <h3 className="text-sm font-thin opacity-50">
                  @{data?.username}
                </h3>
                <img
                  src={data?.avatar_url ? data.avatar_url : initialAvatar}
                  alt="profile picture"
                  className="w-[40px] h-[40px] rounded-full"
                />
              </Link>
            )}
          </>
        ) : (
          <div className="flex flex-row items-center gap-x-8">
            <Link
              to="/login"
              className="text-md font-extralight transition-all hover:opacity-80">
              Log in
            </Link>
            <Link
              to="/register"
              className="text-xl font-light bg-pink-400 rounded-md py-1 px-2 transition-all hover:bg-pink-300 active:translate-y-[2px]">
              Get started
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
