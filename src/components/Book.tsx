import {
  BookOutlined,
  DeleteOutlined,
  EditOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { BookType } from "../Types";
import moment from "moment";
import { Button, Tooltip } from "antd";
import styles from "./Book.module.css";
interface BookProps {
  record: BookType;
  text: string;
  deleteBook: (bookId: number) => void;
}
export default function Book({ record, text, deleteBook }: BookProps) {
  const { bookId, title, author, createdAt, url } = record;
  return (
    <div className={styles.book}>
      <div className={styles.title}>
        <Link to={`/book/${bookId}`} className={styles.link_detail_title}>
          <BookOutlined />
          {title}
        </Link>
      </div>
      <div className={styles.author}>
        <Link to={`/book/${bookId}`} className={styles.link_detail_author}>
          {author}
        </Link>
      </div>
      <div className={styles.created}>
        {moment(createdAt).format("MM-DD-YYYY hh:mm a")}
      </div>
      <div className={styles.tooltips}>
        <Tooltip title={url}>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className={styles.link_url}
          >
            <Button
              size="small"
              type="primary"
              shape="circle"
              icon={<HomeOutlined />}
              className={styles.button_url}
            ></Button>
          </a>
        </Tooltip>
        <Tooltip title="Edit">
          <Button
            size="small"
            shape="circle"
            icon={<EditOutlined />}
            className={styles.button_edit}
          ></Button>
        </Tooltip>
        <Tooltip title="Delete">
          <Button
            size="small"
            type="primary"
            shape="circle"
            danger
            icon={<DeleteOutlined />}
            className={styles.button_delete}
            onClick={clickDelete}
          ></Button>
        </Tooltip>
      </div>
    </div>
  );
  function clickDelete() {
    deleteBook(bookId);
  }
}
