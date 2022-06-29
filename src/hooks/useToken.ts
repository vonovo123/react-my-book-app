import { RootState } from "../Types";
import { useSelector } from "react-redux";
export default function useToken() {
  const token = useSelector<RootState, string | null>((state) => {
    return state.auth.token;
  });
  return token;
}
