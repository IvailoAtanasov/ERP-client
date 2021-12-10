import { useEffect } from "react";
import Employees from "../Employees/Employees";
import { useNavigate } from "react-router-dom";

export const AdminPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <>
      <Employees />
    </>
  );
};
