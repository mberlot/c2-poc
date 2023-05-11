import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <Link className={styles.card} href="/trackpad">
          <h2>
            TRACKPAD <span>-&gt;</span>
          </h2>
        </Link>
        <Link className={styles.card} href="/scrolleable">
          <h2>
            SCROLLEABLE LISTENER <span>-&gt;</span>
          </h2>
        </Link>
      </div>

      <div className={styles.grid}></div>
    </main>
  );
}
