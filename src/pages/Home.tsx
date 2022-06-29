import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Types";
import { useNavigate } from "react-router-dom";
import ListContainer from "../containers/ListContainer";
import useToken from "../hooks/useToken";
export default function Home() {
  const navigate = useNavigate();
  const token = useToken();
  useEffect(() => {
    if (token === null) {
      navigate("/signin");
    }
  }, [navigate, token]);

  return <ListContainer />;
}
