import { ForkOutlined } from "@ant-design/icons";
import {
  PageHeader,
  Button,
  Input,
  InputRef,
  message as messageDialog,
} from "antd";
import TextArea, { TextAreaRef } from "antd/lib/input/TextArea";
import Layout from "./Layout";
import styles from "./Add.module.css";
import { useRef } from "react";
import { BookReqType } from "../Types";
import { useNavigate } from "react-router-dom";
interface AddProps {
  back: () => void;
  logout: () => void;
  add: (book: BookReqType) => void;
  loading: boolean;
}
export default function Add({ back, logout, add, loading }: AddProps) {
  const titleRef = useRef<InputRef>(null);
  const messageRef = useRef<TextAreaRef>(null);
  const authorRef = useRef<InputRef>(null);
  const urlRef = useRef<InputRef>(null);
  const navigate = useNavigate();
  return (
    <Layout>
      <PageHeader
        onBack={back}
        title={
          <div>
            <ForkOutlined>Add Book</ForkOutlined>
          </div>
        }
        subTitle="Add Your Book"
        extra={[
          <Button key="1" type="primary" onClick={logout}>
            Logout
          </Button>,
        ]}
      />
      <div className={styles.add}>
        <div className={styles.input_title}>
          Title
          <span className={styles.required}>*</span>
        </div>
        <div className={styles.input_area}>
          <Input
            placeholder="Title"
            className={styles.input}
            ref={titleRef}
          ></Input>
        </div>
        <div className={styles.input_comment}>
          Comment
          <span className={styles.required}>*</span>
        </div>
        <div className={styles.input_area}>
          <TextArea
            rows={4}
            placeholder="comment"
            className={styles.input}
            ref={messageRef}
          ></TextArea>
        </div>
        <div className={styles.input_author}>
          Author
          <span className={styles.required}>*</span>
        </div>
        <div>
          <Input
            className={styles.input}
            placeholder="Author"
            ref={authorRef}
          ></Input>
        </div>
        <div className={styles.input_url}>
          URL
          <span className={styles.required}>*</span>
        </div>
        <div className={styles.input_area}>
          <Input
            placeholder="URL"
            className={styles.input}
            ref={urlRef}
          ></Input>
        </div>
        <div className={styles.button_area}>
          <Button
            size="large"
            loading={loading}
            onClick={click}
            className={styles.button}
          >
            Add
          </Button>
        </div>
      </div>
    </Layout>
  );
  function click() {
    const title = titleRef!.current!.input!.value;
    const message = messageRef!.current!.resizableTextArea?.textArea.value;
    const author = authorRef!.current!.input!.value;
    const url = urlRef!.current!.input!.value;
    console.log(title, message, author, url);
    if (title === "" || message === "" || author === "" || url === "") {
      messageDialog.error("Please fill out all inputs");
      return;
    }
    add({ title, message, author, url, navigate });
  }
}
