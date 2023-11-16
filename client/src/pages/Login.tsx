import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "./../utils/axios";

interface IData {
  login: string;
  password: string;
}

const Login: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IData>();

  const onSubmit: SubmitHandler<IData> = async data => {
    let token;
    await axios
      .post("auth/login", data)
      .then(res => (token = res.data.access_token))
      .catch(err => alert(err.response.data.message));

    if (token) {
      localStorage.setItem("token", token);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("login", { required: true })} placeholder="Login" />
      <input
        {...register("password", { required: true })}
        placeholder="password"
      />
      <input type="submit" />
    </form>
  );
};

export default Login;
