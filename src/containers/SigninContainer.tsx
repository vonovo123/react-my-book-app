import Signin from "../components/Signin";
import { useCallback } from "react";
import { LoginReqType } from "../Types";
import { useDispatch } from "react-redux";
import { login as loginSagaStart } from "../redux/modules/auth";

export default function SigninContainer() {
  const dispatch = useDispatch();
  const login = useCallback(async (reqData: LoginReqType) => {
    await dispatch(loginSagaStart(reqData));
  }, []);
  //
  return <Signin login={login} />;
}
