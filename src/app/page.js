import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import Footer from "./components/Footer";

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
					<div className={`${styles.breatheEntry} lg:text-xl`}>
						Feeling Drained? Take a quick&nbsp;
						<Link href="/breathe" className={styles.cloud}></Link> with us.
					</div>
					<div className={styles.contentDivider}></div>
				</div>
				<div className={styles.contentContainer}>
					<section className={`${styles.body} lg:text-xl`}>
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
				<div className="fixed bottom-0 left-0 right-0 flex justify-center pb-8">
					<Footer />
				</div>
			</main>
		</div>
	);
}
