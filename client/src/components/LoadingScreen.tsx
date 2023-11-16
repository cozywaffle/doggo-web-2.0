import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const LoadingScreen: FC = () => {
  const status = useSelector<RootState>(state => state.auth.status);
  const isLoaded = status === "failed" || status == "success" ? true : false;

  return (
    <div
      className={`flex justify-center items-center transition-all delay-250 duration-1000 bg-black absolute z-40 h-[100%] w-[100%] ${
        isLoaded && "bg-transparent"
      } ${isLoaded && "text-transparent"} ${isLoaded && "z-[-1]"}`}>
      <h1 className="text-xl font-light">Loading . . .</h1>
    </div>
  );
};

export default LoadingScreen;
