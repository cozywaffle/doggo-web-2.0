import { FC } from "react";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";

const App: FC = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default App;
