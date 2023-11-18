import { FC } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../redux/slices/auth.slice";
import { RootState } from "../redux/store";
import logo from "../assets/shiba-logo.png";
import { Avatar, Button } from "@mui/material";
import stringAvatar from "../utils/emptyAvatarGenerator";

const NavBar: FC = () => {
  const isAuth = useSelector(selectIsAuth);

  const data = useSelector((state: RootState) => state.auth.data);

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
                <Avatar
                  {...stringAvatar((data?.username || "").toString())}
                  className="w-[40px] h-[40px] rounded-full"></Avatar>
              </Link>
            )}
          </>
        ) : (
          <div className="flex flex-row items-center gap-x-8">
            <Link to="/login">
              <Button
                variant="text"
                className="text-white font-thin rounded-full px-3">
                Log in
              </Button>
            </Link>
            <Link to="/register">
              <Button
                variant="contained"
                className="text-white bg-pink-400 hover:bg-pink-300">
                Get started
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
