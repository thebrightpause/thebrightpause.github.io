import { BsYoutube } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsTwitterX } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import styles from "../page.module.css";
import IconButton from "./IconButton";
import Image from "next/image";

export default function Footer() {
	return (
		<div className="flex flex-wrap items-center gap-2">
			<Image
				className={styles.logo}
				style={{ alignSelf: "center" }}
				src="/thebrightpause-logo.svg"
				alt="The Bright Pause logo"
				width={180}
				height={180}
				priority
			/>
			<div className="hidden sm:block h-8 border-l border-white mr-8"></div>
			<div className="flex items-center text-sm lg:text-xl font-bright-pause">
				Find more&nbsp;
				{/* <span className="hidden lg:block">bright pauses&nbsp;</span> */}
				<span>bright pauses&nbsp;</span>
				at
			</div>
			{/* <IconButton Icon={BsYoutube} link="https://youtube.com/@thebrightpause" /> */}
			<IconButton
				Icon={BsInstagram}
				link="https://instagram.com/thebrightpause"
			/>
			<IconButton Icon={BsTwitterX} link="https://twitter.com/thebrightpause" />
			<IconButton
				Icon={BsLinkedin}
				link="https://linkedin.com/company/thebrightpause"
			/>
		</div>
	);
}
