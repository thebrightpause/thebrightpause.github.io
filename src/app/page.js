import Image from "next/image";
import styles from "./page.module.css";
import { BsYoutube } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsTwitterX } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          style={{ alignSelf: "center" }}
          src="/thebrightpause-logo.svg"
          alt="The Bright Pause logo"
          width={180}
          height={180}
          priority
        />
        <section className={styles.body}>
          <p>
            Today's social media landscape pushes you to compare your life to
            others, whether you realize it or not. LinkedIn makes you question
            your career, Twitter leaves you feeling dumb, and Instagram makes it
            seem like you're not enjoying life enough. The overwhelming amount
            of negative news, ads, and videos leaves you feeling drained.
          </p>
          <br />
          <p>
            The Bright Pause is the bringing in a change by reminding people
            that reality isn’t as bad as it often seems. It aims to give you a
            break from your routine virtual scroll, offering optimism, and a
            moment of mindful awareness for your real life.
          </p>
        </section>
        <section className={styles.socialLinkContainer}>
          <a
            href="https://instagram.com/thebrightpause"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsInstagram />
            Instagram
          </a>
          <a
            href="https://x.com/thebrightpause"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsTwitterX />
            Twitter
          </a>
          <a
            href="https://www.linkedin.com/in/thebrightpause"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsLinkedin />
            LinkedIn
          </a>
          <a
            href="https://youtube.com/@thebrightpause"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsYoutube />
            YouTube
          </a>
        </section>
      </main>
    </div>
  );
}
