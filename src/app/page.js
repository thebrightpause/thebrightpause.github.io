import Image from "next/image";
import Link from "next/link";
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
          className={styles.logoDesktop}
          style={{ alignSelf: "center" }}
          src="/thebrightpause-logo.svg"
          alt="The Bright Pause logo"
          width={180}
          height={180}
          priority
        />
        <div>
          <div className={styles.breatheEntry}>
            Feeling Drained? Take a quick&nbsp;
            <Link href="/breathe" className={styles.cloud}></Link> with us.
          </div>
          <div className={styles.contentDivider}></div>
        </div>
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
        </div>
        <section className={styles.socialLinkContainer}>
          <Image
            className={styles.logo}
            style={{ alignSelf: "center" }}
            src="/thebrightpause-logo.svg"
            alt="The Bright Pause logo"
            width={180}
            height={180}
            priority
          />
          <div className={styles.footerLine}></div>
          <p className={styles.footerMessage}>Find more bright pauses at</p>
          <a
            href="https://instagram.com/thebrightpause"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsInstagram />
          </a>
          <a
            href="https://x.com/thebrightpause"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsTwitterX />
          </a>
          <a
            href="https://www.linkedin.com/company/thebrightpause"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsLinkedin />
          </a>
          <a
            href="https://youtube.com/@thebrightpause"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsYoutube />
          </a>
        </section>
      </main>
    </div>
  );
}
