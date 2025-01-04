"use client";

import styles from "./breathe.module.css";
import { useEffect, useState } from "react";

const STATES = {
	INTRODUCTION: "introduction",
	GET_READY: "get-ready",
	IN_PROGRESS: "in-progress",
	END: "end",
};

export default function Meditate() {
	const [pageState, setPageState] = useState(STATES.INTRODUCTION);

	const goToNextPageState = () => {
		switch (pageState) {
			case STATES.INTRODUCTION:
				setPageState(STATES.GET_READY);
				break;
			case STATES.GET_READY:
				setPageState(STATES.IN_PROGRESS);
				break;
			case STATES.IN_PROGRESS:
				setPageState(STATES.END);
				break;
			default:
				setPageState(STATES.INTRODUCTION);
		}
	};

	return (
		<div className={styles.page}>
			{pageState === STATES.INTRODUCTION && (
				<Introduction goToNextPageState={goToNextPageState} />
			)}
			{pageState === STATES.GET_READY && (
				<GetReady goToNextPageState={goToNextPageState} />
			)}
			{pageState === STATES.IN_PROGRESS && (
				<InProgress goToNextPageState={goToNextPageState} />
			)}
			{pageState === STATES.END && (
				<End goToNextPageState={goToNextPageState} />
			)}
		</div>
	);

	function Introduction({ goToNextPageState }) {
		useEffect(() => {
			const timer = setTimeout(() => {
				goToNextPageState();
			}, 4000);
			return () => clearTimeout(timer);
		}, [goToNextPageState]);
		return <h1 className={styles.introductiontext}>Breathe</h1>;
	}

	function GetReady({ goToNextPageState }) {
		return (
			<div className={styles.container}>
				<h1 className={styles.titlefadein}>Get Ready</h1>
				<h1 className={styles.subtitlefadein}>
					Sit comfortably upright in a silent and safe space
				</h1>
				<button className={styles.button1} onClick={goToNextPageState}>
					Start
				</button>
			</div>
		);
	}

	function End({ goToNextPageState }) {
		return (
			<div className={styles.container}>
				<h1 className={styles.titlefadein}>Bye</h1>
			</div>
		);
	}

	function InProgress({ goToNextPageState }) {
		const breathInstructions = ["Inhale", "Hold", "Exhale", "Hold"];
		const [currentInstructionIndex, setCurrentInstructionIndex] = useState(0);

		useEffect(() => {
			const intervalId = setInterval(() => {
				setCurrentInstructionIndex(
					(prevIndex) => (prevIndex + 1) % breathInstructions.length
				);
			}, 5000);

			return () => clearInterval(intervalId);
		}, []);

		setTimeout(() => {
			goToNextPageState();
		}, 120000);
		return (
			<aside className={styles.breathecontainer}>
				{/* <h1 className={styles.title}>In progress page</h1> */}
				<div className={styles.boxborder}>
					<div className={styles.trail}></div>
				</div>
				<div className={styles.box}>
					<p className={styles.instuction}>
						{breathInstructions[currentInstructionIndex]}
					</p>
				</div>
			</aside>
		);
	}
}
