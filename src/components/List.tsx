import Layout from "./Layout";
import { Button, PageHeader, Table } from "antd";
import { BookType } from "../Types";
import { useEffect } from "react";
import styles from "./List.module.css";
import Book from "./Book";
interface ListProps {
  books: BookType[] | null;
  loading: boolean;
  error: Error | null;
  logout: () => void;
  getBooks: () => void;
  goAdd: () => void;
  deleteBook: (bookId: number) => void;
}
export default function List({
  books,
  loading,
  error,
  logout,
  getBooks,
  goAdd,
  deleteBook,
}: ListProps) {
  useEffect(() => {
    getBooks();
  }, [getBooks]);
  useEffect(() => {
    if (error) {
      logout();
    }
  }, [error, logout]);
  return (
    <Layout>
      <PageHeader
        title={<div>Book List</div>}
        extra={[
          <Button
            key="1"
            type="primary"
            onClick={goAdd}
            className={styles.button}
          >
            Add Book
          </Button>,
          <Button
            key="2"
            type="primary"
            onClick={logout}
            className={styles.button}
          >
            Logout
          </Button>,
        ]}
      ></PageHeader>
      <Table
        dataSource={books || undefined}
        columns={[
          {
            title: "Book",
            dataIndex: "book",
            key: "book",
            render: (text, record) => (
              <Book text={text} record={record} deleteBook={deleteBook} />
            ),
          },
        ]}
        loading={books === null || loading}
        showHeader={false}
        rowKey="bookId"
        pagination={false}
        className={styles.table}
      ></Table>
    </Layout>
  );
}
