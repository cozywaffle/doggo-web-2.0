import { FC, useEffect, useState } from "react";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import NavBar from "./components/NavBar";
import Wrapper from "./components/Wrapper";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./redux/store";
import { getMe } from "./redux/slices/auth.slice";
import LoadingScreen from "./components/LoadingScreen";

const App: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const loadData = async () => {
      await dispatch(getMe());
    };
    loadData();
  }, []);

  return (
    <>
      <LoadingScreen />
      <NavBar />
      <Wrapper>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/:id/:username" element={<Profile />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Wrapper>
    </>
  );
};

export default App;
