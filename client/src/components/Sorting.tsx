import { FC, useEffect, useState } from "react";
import { Button, ButtonGroup } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { getSorted } from "../redux/slices/posts.slice";

const orders = ["popular", "most liked", "most disliked", "latest", "folowing"];

const Sorting: FC = () => {
  const [activeOrder, setActiveOrder] = useState("popular");
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchPosts = async () => {
      await dispatch(getSorted(activeOrder.replace(" ", "-")));
    };
    fetchPosts();
  }, [activeOrder]);

  const handleOnClick = async (order: string) => {
    setActiveOrder(order);
  };

  return (
    <div className="flex items-center gap-4">
      <ButtonGroup variant="text" color="warning">
        {orders.map(order => (
          <Button
            key={order}
            color={activeOrder === order ? "warning" : "info"}
            className={activeOrder !== order ? "text-white" : ""}
            onClick={() => handleOnClick(order)}>
            {order}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};

export default Sorting;
