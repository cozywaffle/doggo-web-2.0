import { ChangeEvent, FC, KeyboardEvent, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Backdrop, Button, TextField } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import axios from "../utils/axios";

interface IData {
  title: string;
  content: string;
}

const CreatePost: FC = () => {
  const [activeEditing, setActiveEditing] = useState<boolean>(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef(null);
  const { register, handleSubmit } = useForm<IData>();

  const toggleEditing = (e: globalThis.MouseEvent) => {
    if (e.target && containerRef.current) {
      if ((e.target as Node).contains(containerRef.current as Node))
        setActiveEditing(false);
    }
  };

  window.onclick = (e: globalThis.MouseEvent) => toggleEditing(e);

  const handleUpload = async (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;

    const image: File = (target.files as FileList)[0];

    if (image) {
      const formData = new FormData();
      formData.append("file", image);

      const { data } = await axios.post("upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setImage(data);
      console.log(data);
    }
  };

  const setTag = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.code !== "Enter") return;
    e.preventDefault();
    e.stopPropagation();

    setTags([...tags, (e.target as HTMLTextAreaElement).value]);
    (e.target as HTMLTextAreaElement).value = "";
  };

  const submitHandler: SubmitHandler<IData> = async data => {
    try {
      const postTemplate = {
        title,
        content: data.content,
        tags,
        image_url: image,
      };

      console.log(postTemplate);

      const postData = await axios
        .post("posts/create", postTemplate)
        .catch(err => {
          throw new Error(err);
        });

      setContent("");
      setImage("");
      setTags([]);

      console.log(postData);

      if (postData) setActiveEditing(false);
      return;
    } catch (error) {
      throw new Error("Couldn't upload post");
    }
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setActiveEditing(!activeEditing)}
        className="bg-transparent text-white hover:bg-neutral-500 hover:bg-opacity-40">
        Publish
      </Button>
      <Backdrop
        open={activeEditing}
        className="flex z-10 items-center justify-center w-full">
        <form
          onSubmit={handleSubmit(submitHandler)}
          ref={containerRef}
          className="flex flex-col bg-neutral-800 bg-opacity-95 rounded-md w-[60%] max-h-[80vh] p-2">
          <div className="flex flex-row items-center justify-start w-full">
            <div className="flex flex-col py-1 px-2 w-[70%] h-full">
              <TextField
                multiline
                variant="standard"
                color="warning"
                rows={1}
                InputLabelProps={{ className: "text-white opacity-60" }}
                InputProps={{ className: "text-white" }}
                label="Title"
                value={title}
                {...register("title", { required: true })}
                onChange={e => setTitle(e.target.value)}></TextField>
              <TextField
                multiline
                variant="filled"
                color="warning"
                rows={10}
                InputLabelProps={{ className: "text-white opacity-60" }}
                InputProps={{ className: "text-white" }}
                label="What's on your mind today?"
                value={content}
                {...register("content", { required: true })}
                onChange={e => setContent(e.target.value)}></TextField>
            </div>
            <Button color="warning" onClick={() => inputRef.current?.click()}>
              <input
                type="file"
                ref={inputRef}
                hidden
                onChange={handleUpload}
              />
              {image ? (
                <img
                  src={image}
                  alt="thumbnail"
                  className="w-[271.13px] h-[271.13px] bg-cover"
                />
              ) : (
                <ImageIcon
                  color="warning"
                  fontSize="large"
                  className="w-full h-[50%] "
                />
              )}
            </Button>
          </div>
          <div className="flex gap-1 p-1 mb-2 text-neutral-600 opacity-80">
            {tags.map((tag, index) => (
              <h3 key={tag + index}>#{tag}</h3>
            ))}
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2 items-center text-md text-white opacity-80 bg-orange-500 w-fit px-2 rounded-md">
              <h1>Tags:</h1>
              <TextField
                color="warning"
                InputProps={{ className: "text-white" }}
                onKeyDown={e => setTag(e)}
                variant="standard"></TextField>
              <h1 className="text-neutral-900">(press enter)</h1>
            </div>
            <Button color="warning" type="submit" variant="contained">
              Create
            </Button>
          </div>
        </form>
      </Backdrop>
    </>
  );
};

export default CreatePost;
