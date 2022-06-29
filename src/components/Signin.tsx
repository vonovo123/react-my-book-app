import styles from "./Signin.module.css";
import { Button, Col, InputRef, Row, Input } from "antd";
import { useRef } from "react";
import { LoginReqType } from "../Types";
import { useNavigate } from "react-router-dom";
interface SigninProps {
  login: (reqData: LoginReqType) => void;
}

export default function Signin({ login }: SigninProps) {
  const navigate = useNavigate();
  const emailRef = useRef<InputRef>(null);
  const passwordRef = useRef<InputRef>(null);
  return (
    <Row align="middle" className={styles.signin_row}>
      <Col span={24}>
        <Row className={styles.signin_contents}>
          <Col span={12}>
            <img
              src="/bg_signin.png"
              alt="Signin"
              className={styles.signin_bg}
            ></img>
          </Col>
          <Col span={12}>
            <div className={styles.signin_title}>My Books</div>
            <div className={styles.signin_subtitle}>
              Please Note Your Opinion
            </div>
            <div className={styles.signin_underline} />
            <div className={styles.email_title}>
              Email
              <span className={styles.signin_required}>*</span>
            </div>
            <div className={styles.input_area}>
              <Input
                placeholder="Email"
                autoComplete="email"
                name="email"
                className={styles.input}
                ref={emailRef}
                value={"mark@test.com"}
              />
            </div>
            <div className={styles.password_title}>
              Password
              <span className={styles.signin_required}>*</span>
            </div>
            <div className={styles.input_area}>
              <Input
                autoComplete="current-password"
                type="password"
                name="password"
                className={styles.input}
                ref={passwordRef}
                value={"fastcampus"}
              />
            </div>
            <div className={styles.button_area}>
              <Button size="large" className={styles.button} onClick={click}>
                Sign In
              </Button>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
  function click() {
    const email = emailRef.current!.input!.value;
    const password = passwordRef.current!.input!.value;
    login({ email, password, navigate });
  }
}
