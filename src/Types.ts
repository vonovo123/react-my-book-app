import { NavigateFunction } from "react-router-dom";
export interface AuthState {
  token: string | null;
  loading: boolean;
  error: Error | null;
}
export interface RootState {
  auth: AuthState;
  books: BooksState;
}
export interface LoginReqType {
  email: string;
  password: string;
  navigate: NavigateFunction;
}
export interface LogoutReqType {
  navigate: NavigateFunction;
}
export interface BookType {
  bookId: number;
  title: string;
  author: string;
  createdAt: string;
  url: string;
}
export interface BooksState {
  books: BookType[] | null;
  loading: boolean;
  error: Error | null;
}
export interface BookReqType {
  title: string | undefined;
  message: string | undefined;
  author: string | undefined;
  url: string | undefined;
  navigate: NavigateFunction;
}
