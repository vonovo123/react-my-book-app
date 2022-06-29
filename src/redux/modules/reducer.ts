import { combineReducers } from "redux";
import auth from "./auth";
import books from "./books";
const reducer = combineReducers({
  auth,
  books,
});
export default reducer;
