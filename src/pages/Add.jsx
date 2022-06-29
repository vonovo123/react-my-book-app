import { useEffect } from "react";
import AddContainer from "../containers/AddContainer";
import useToken from "../hooks/useToken";
import { useNavigate } from "react-router-dom";
export default function Add() {
  const token = useToken();
  const navigate = useNavigate();
  useEffect(() => {
    if (token === null) {
      navigate("/signin");
    }
  }, [navigate, token]);
  return <AddContainer></AddContainer>;
}
