import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  MouseEvent,
  useRef,
  useState,
} from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Backdrop, Button, TextField } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import axios from "../utils/axios";

interface IData {
  content: string;
}

const Main: FC = () => {
  const [activeEditing, setActiveEditing] = useState<boolean>(false);
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef(null);
  const { register, handleSubmit } = useForm<IData>();

  const toggleEditing = (e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
    if (e.target && containerRef.current) {
      if ((e.target as Node).contains(containerRef.current as Node))
        setActiveEditing(false);
    }
  };

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
      const postTemplate = { content: data.content, tags, image_url: image };

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
    } catch (error) {}
  };

  return (
    <main
      onClick={e => toggleEditing(e)}
      className="bg-neutral-800 bg-opacity-95 rounded-2xl w-[95%] h-full px-4 py-2 flex flex-col justify-start items-center">
      <button
        onClick={() => setActiveEditing(!activeEditing)}
        className="w-[50%] bg-neutral-700 p-1 rounded-md shadow-sm shadow-black text-lg font-normal cursor-pointer transition-all hover:bg-neutral-600 active:translate-y-[2px]">
        Create publication
      </button>
      <Backdrop
        open={activeEditing}
        className="flex items-center justify-center w-full">
        <form
          onSubmit={handleSubmit(submitHandler)}
          ref={containerRef}
          className="flex flex-col bg-neutral-800 bg-opacity-95 rounded-md w-[60%] max-h-[80vh] p-2">
          <div className="flex flex-row items-center justify-start w-full">
            <TextField
              multiline
              variant="filled"
              color="primary"
              rows={10}
              InputLabelProps={{ className: "text-white opacity-60" }}
              InputProps={{ className: "text-white" }}
              label="What's on your mind today?"
              className="py-1 px-2 w-[70%] h-full"
              value={content}
              {...register("content", { required: true })}
              onChange={e => setContent(e.target.value)}></TextField>
            <Button onClick={() => inputRef.current?.click()}>
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
                <ImageIcon fontSize="large" className="w-full h-[50%]" />
              )}
            </Button>
          </div>
          <div className="flex gap-1 p-1 mb-2 text-neutral-600 opacity-80">
            {tags.map((tag, index) => (
              <h3 key={tag + index}>#{tag}</h3>
            ))}
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2 items-center text-md text-neutral-300 opacity-80 bg-neutral-600 w-fit px-2 rounded-md">
              <h1>Tags:</h1>
              <TextField
                InputProps={{ className: "text-white" }}
                onKeyDown={e => setTag(e)}
                variant="standard"></TextField>
              <h1 className="text-neutral-900">(press enter)</h1>
            </div>
            <Button type="submit" variant="contained">
              Create
            </Button>
          </div>
        </form>
      </Backdrop>
    </main>
  );
};

export default Main;
