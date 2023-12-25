import { FC } from "react";
import { Link } from "react-router-dom";
import { IPost } from "../redux/slices/types";

interface IProps {
  props: IPost;
}

const Post: FC<IProps> = ({ props }) => {
  console.log(props.author);

  return (
    <Link
      to={`/posts/${props.id}`}
      key={props.authorId + Math.random()}
      id={props.id.toString()}
      className="flex flex-col justify-center items-center p-2 rounded-lg bg-neutral-800 shadow-2xl space-x-2 transition-all cursor-pointer hover:bg-neutral-700 hover:shadow-xl">
      {props.image_url && (
        <div className="flex items-center justify-center">
          <img
            src={props.image_url}
            alt=""
            className="w-screen h-fit rounded-lg"
          />
        </div>
      )}
      <div className="flex items-center justify-between w-full text-sm font-thin p-1 opacity-50">
        <h1>@{props.author.username}</h1>
        <h5 className="flex w-[50%] font-thin opacity-50 text-sm truncate">
          {props.tags.map((tag: string, index) => (
            <p key={props.authorId + index} className="p-1">
              #{tag}
            </p>
          ))}
        </h5>
        <h2>{props.updated_at.toLocaleString()}</h2>
      </div>
      <h1 className="text-lg font-bold p-1">{props.title}</h1>
      <p className="truncate w-[500px] text-md font-normal p-1">
        {props.content}
      </p>
      <div className="flex justify-between items-center w-full px-2">
        <div className="flex items-center gap-1 text-sm font-thin opacity-30"></div>
        <div></div>
      </div>
    </Link>
  );
};

export default Post;
