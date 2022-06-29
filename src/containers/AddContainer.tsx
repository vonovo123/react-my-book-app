import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Add from "../components/Add";
import { BookReqType, RootState } from "../Types";
import { logout as logoutSagaStart } from "../redux/modules/auth";
import { addBook as addBookSagaStart } from "../redux/modules/books";
export default function AddContainer() {
  const loading = useSelector<RootState, boolean>(
    (state) => state.books.loading
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const back = useCallback(() => {
    navigate(-1);
  }, [navigate]);
  const logout = useCallback(() => {
    console.log("add logout");
    dispatch(logoutSagaStart({ navigate }));
  }, [dispatch, navigate]);
  const add = useCallback(
    (book: BookReqType) => {
      dispatch(addBookSagaStart(book));
    },
    [dispatch]
  );
  return <Add loading={loading} back={back} logout={logout} add={add}></Add>;
}
