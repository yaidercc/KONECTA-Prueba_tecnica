import { Route, Routes } from "react-router-dom";
import { RequestProvider } from "../../context/Requests/RequestProvider";
import { Requests } from "../pages/Requests";

export const RequestsRoutes = () => {
  return (
    <RequestProvider>
      <Routes>
        <Route path="/" element={<Requests />} />
      </Routes>
    </RequestProvider>
  );
};
