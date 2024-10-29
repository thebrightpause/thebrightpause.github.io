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
        <div className={styles.contentContainer}>
          <section className={styles.body}>
            <p>
              Today&apos;s social media landscape pushes you to compare your
              life to others, whether you realize it or not. LinkedIn makes you
              question your career, Twitter leaves you feeling dumb, and
              Instagram makes life seem less exciting. The overwhelming amount
              of negative news, ads, and videos leaves you feeling drained.
            </p>
            <br />
            <p>
              The Bright Pause is bringing in a change by reminding people that
              reality isn&apos;t as bad as it often seems. It offers a break
              from routine scrolling, with moments of optimism and mindful
              awareness for real life.
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
              href="https://www.linkedin.com/company/thebrightpause"
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
        </div>
      </main>
    </div>
  );
}
