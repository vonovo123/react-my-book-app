import { Action } from "redux-actions";
import { createActions, handleActions } from "redux-actions";
import { put, select, takeLatest, call, takeEvery } from "redux-saga/effects";
import BookService from "../../Services/BookService";
import { BookType, BooksState, BookReqType } from "../../Types";

const initialState: BooksState = {
  books: null,
  loading: false,
  error: null,
};

const prefix = "my-books/books";
export const { pending, success, fail } = createActions(
  "PENDING",
  "SUCCESS",
  "FAIL",
  { prefix }
);
//handleAction<State, typeof Action.payLoad>
const reducer = handleActions<BooksState, BookType[]>(
  {
    PENDING: (state) => ({ ...state, loading: true, error: null }),
    SUCCESS: (state, action) => ({
      books: action.payload,
      loading: false,
      error: null,
    }),
    FAIL: (state, action: any) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
  initialState,
  { prefix }
);

export default reducer;

//비동기 처리를 위한 saga
export const { getBooks, addBook, deleteBook } = createActions(
  "GET_BOOKS",
  "ADD_BOOK",
  "DELETE_BOOK",
  {
    prefix,
  }
);
function* getBooksSaga() {
  try {
    yield put(pending());
    const token: string = yield select((state) => state.auth.token);
    const books: BookType[] = yield call(BookService.getBooks, token);
    yield put(success(books));
  } catch (error: any) {
    yield put(fail(new Error(error?.response?.data?.error || "unKown Error")));
  }
}

function* addBookSaga(action: Action<BookReqType>) {
  try {
    yield put(pending());
    const token: string = yield select((state) => state.auth.token);
    const book: BookType = yield call(
      BookService.addBook,
      token,
      action.payload
    );
    const books: BookType[] = yield select((state) => state.books.books);
    yield put(success([...books, book]));
  } catch (error: any) {
    yield put(fail(new Error(error?.response?.data?.error || "unKown Error")));
  } finally {
    const navigate = action.payload.navigate;
    navigate("/");
  }
}
function* deleteBookSaga(action: Action<number>) {
  try {
    yield put(pending());
    const token: string = yield select((state) => state.auth.token);
    const bookId = action.payload;
    const book: BookType = yield call(BookService.deleteBook, token, bookId);
    const books: BookType[] = yield select((state) => state.books.books);
    yield put(success(books.filter((book) => book.bookId !== bookId)));
  } catch (error: any) {
    yield put(fail(new Error(error?.response?.data?.error || "unKown Error")));
  } finally {
    //const navigate = action.payload.navigate;
    //navigate("/");
  }
}
export function* booksSaga() {
  yield takeLatest(`${prefix}/GET_BOOKS`, getBooksSaga);
  yield takeEvery(`${prefix}/ADD_BOOK`, addBookSaga);
  yield takeEvery(`${prefix}/DELETE_BOOK`, deleteBookSaga);
}
