import SigninContainer from "../containers/SigninContainer";
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
