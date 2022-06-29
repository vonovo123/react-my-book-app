import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import List from "../components/List";
import { RootState } from "../Types";
import { BookType } from "../Types";
import {
  getBooks as getBooksSagaStart,
  deleteBook as deleteBookSagaStart,
} from "../redux/modules/books";
import { logout as logoutSagaStart } from "../redux/modules/auth";
import { useNavigate } from "react-router-dom";
export default function ListContainer() {
  const navigate = useNavigate();
  const books = useSelector<RootState, BookType[] | null>(
    (state) => state.books.books
  );

  const loading = useSelector<RootState, boolean>(
    (state) => state.books.loading
  );
  const error = useSelector<RootState, Error | null>(
    (state) => state.books.error
  );
  const dispatch = useDispatch();
  const logout = useCallback(() => {
    dispatch(logoutSagaStart({ navigate }));
  }, [dispatch, navigate]);
  const goAdd = useCallback(() => {
    navigate("/add");
  }, [navigate]);
  const getBooks = useCallback(() => {
    dispatch(getBooksSagaStart());
  }, [dispatch]);
  const deleteBook = useCallback(
    (bookId: number) => {
      dispatch(deleteBookSagaStart(bookId));
    },
    [dispatch]
  );

  return (
    <List
      books={books}
      loading={loading}
      getBooks={getBooks}
      goAdd={goAdd}
      logout={logout}
      deleteBook={deleteBook}
      error={error}
    ></List>
  );
}
