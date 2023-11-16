import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOne } from "../redux/slices/users.slice";
import { AppDispatch, RootState } from "../redux/store";
import { IData } from "../redux/slices/types";

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
  }, []);
  const data = useSelector<RootState>(state => state.users.userData) as IData;

  return <div>{data.userData?.username}</div>;
};

export default Profile;
