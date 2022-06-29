import { useSelector } from "react-redux";
import SigninContainer from "../containers/SigninContainer";
import { RootState } from "../Types";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useToken from "../hooks/useToken";
export default function Signin() {
  const navigate = useNavigate();
  const token = useToken();
  console.log("signin token", token);
  useEffect(() => {
    if (token !== null) {
      navigate("/");
    }
  }, [navigate, token]);

  return <SigninContainer></SigninContainer>;
}
