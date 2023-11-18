import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { createUser, getMe } from "../redux/slices/auth.slice";
import { Button, TextField } from "@mui/material";

interface IData {
  login: string;
  password: string;
  username: string;
}

const Register: FC = () => {
  const [auth, setAuth] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<IData>();

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit: SubmitHandler<IData> = async inputData => {
    const data = await dispatch(createUser(inputData));

    console.log(data);

    const token = data.payload.access_token;

    if (token) {
      localStorage.setItem("token", token);
      await dispatch(getMe());
      setAuth(true);
    }
  };

  if (auth) return <Navigate to="/" />;

  return (
    <section className="text-white bg-neutral-800 p-6 rounded-md flex flex-col gap-y-4 justify-center items-center">
      <h1 className="text-4xl font-thin py-1">Get started</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-6 justify-center items-center">
        <div className="flex flex-col">
          <TextField
            label="Login"
            variant="outlined"
            InputProps={{ className: "text-white" }}
            InputLabelProps={{ className: "text-white text-opacity-50" }}
            {...register("login", { required: true })}
          />
        </div>
        <div className="flex flex-col">
          <TextField
            label="Password"
            variant="outlined"
            InputProps={{ className: "text-white" }}
            InputLabelProps={{ className: "text-white text-opacity-50" }}
            {...register("password", { required: true })}
          />
        </div>
        <div className="flex flex-col">
          <TextField
            label="Username"
            variant="outlined"
            InputProps={{ className: "text-white" }}
            InputLabelProps={{ className: "text-white text-opacity-50" }}
            {...register("username", { required: true })}
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          className="bg-pink-400 hover:bg-pink-300">
          Continue
        </Button>
      </form>
      <div className="flex text-xs font-thin justify-between gap-x-8 opacity-50">
        <p>Already have an account?</p>
        <Link className="underline" to="/login">
          Sign in
        </Link>
      </div>
    </section>
  );
};

export default Register;
