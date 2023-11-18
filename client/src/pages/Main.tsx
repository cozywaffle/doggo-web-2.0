import { FC, useState } from "react";
import { useForm } from "react-hook-form";

const Main: FC = () => {
  const [activeEditing, setActiveEditing] = useState<boolean>(false);
  const { register, handleSubmit } = useForm();

  return (
    <main className="bg-neutral-800 bg-opacity-95 rounded-2xl w-[95%] h-full px-4 py-2 flex flex-col justify-start items-center">
      <button
        onClick={() => setActiveEditing(!activeEditing)}
        className="w-[50%] bg-neutral-700 p-1 rounded-md shadow-sm shadow-black text-lg font-normal cursor-pointer transition-all hover:bg-neutral-600 active:translate-y-[2px]">
        Create publication
      </button>
      {activeEditing ? (
        <>
          <div className="p-2 bg-neutral-950 opacity-95 shadow-lg shadow-black rounded-2xl absolute h-[80vh] w-[60%] z-10 flex flex-col justify-start items-center">
            <input
              {...register("content", { required: true })}
              placeholder="What's on your mind?"
              className="w-full h-fit text-lg font-light bg-neutral-700 bg-opacity-30 rounded-md border border-transparent hover:border-white focus:border-white outline-none shadow-lg py-1 px-2 transition-all placeholder:opacity-20"
              name="content"
            />
          </div>
        </>
      ) : (
        <></>
      )}
    </main>
  );
};

export default Main;
