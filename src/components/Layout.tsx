import styles from "./Layout.module.css";
interface LayoutType {
  children: any;
}
export default function Layout({ children }: LayoutType) {
  return <div className={styles.layout}>{children}</div>;
}
