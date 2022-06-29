import { Action, createActions, handleActions } from "redux-actions";
import { call, put, takeEvery, select } from "redux-saga/effects";
import { LoginReqType, LogoutReqType } from "../../Types";
import UserService from "../../Services/UserService";
import TokenService from "../../Services/TokenService";
import { AuthState } from "../../Types";

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
};

const prefix = "my-books/auth";
export const { pending, success, fail } = createActions(
  "PENDING",
  "SUCCESS",
  "FAIL",
  { prefix }
);

const reducer = handleActions<AuthState, string>(
  {
    PENDING: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    SUCCESS: (state, action) => ({
      token: action.payload,
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
  {
    prefix,
  }
);

export default reducer;
export const { login, logout } = createActions("LOGIN", "LOGOUT", { prefix });
function* loginSaga(action: Action<LoginReqType>) {
  try {
    yield put(pending());
    const token: string = yield call(UserService.login, action.payload);
    const navigate = action.payload.navigate;
    TokenService.set(token);
    yield put(success(token));
    navigate("/");
  } catch (error: any) {
    yield put(fail(new Error(error?.response?.data?.error || "unKown Error")));
  }
}

function* logoutSaga(action: Action<LogoutReqType>) {
  try {
    yield put(pending());
    const token: string = yield select((state) => state.auth.token);
    yield call(UserService.logout, token);
    //localStorage
    yield put(success(token));
  } catch (error: any) {
  } finally {
    TokenService.remove();
    yield put(success(null));
    const navigate = action.payload.navigate;
    navigate("/signin");
  }
}
export function* authSaga() {
  yield takeEvery(`${prefix}/LOGIN`, loginSaga);
  yield takeEvery(`${prefix}/LOGOUT`, logoutSaga);
}
