"use client";

import styles from "./breathe.module.css";
import { useEffect, useState } from "react";
import Breathing from "./components/components";
import IconButton from "../components/IconButton";
import { SlReload } from "react-icons/sl";
import Footer from "../components/Footer";
import React from "react";

const STATES = {
	INTRODUCTION: "introduction",
	GET_READY: "get-ready",
	INSTRUCTIONS: "instructions",
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
				setPageState(STATES.INSTRUCTIONS);
				break;
			case STATES.INSTRUCTIONS:
				setPageState(STATES.IN_PROGRESS);
				break;
			case STATES.IN_PROGRESS:
				setPageState(STATES.END);
				break;
			case STATES.END:
				setPageState(STATES.INTRODUCTION);
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
			{pageState === STATES.INSTRUCTIONS && (
				<Breathing goToNextPageState={goToNextPageState} />
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
			<div className="flex flex-col justify-center items-center">
				<h1 className={`text-4xl ${styles.titlefadein}`}>Get Ready</h1>
				<h1
					className={`text-xl mt-2 mb-2 text-center ${styles.subtitlefadein}`}
				>
					Sit comfortably upright in a silent and safe space
				</h1>
				<button
					className={`bg-[#273347] px-5 py-2 text-xl rounded-3xl cursor-pointer font-bright-pause ${styles.button1}`}
					onClick={goToNextPageState}
				>
					Start
				</button>
			</div>
		);
	}

	function InProgress({ goToNextPageState }) {
		const breathInstructions = ["Inhale", "Hold", "Exhale", "Hold"];
		const [currentInstructionIndex, setCurrentInstructionIndex] = useState(0);
		const indexRef = React.useRef(0);

		useEffect(() => {
			// Play initial gong
			const audio = new Audio("/gong1.mp3");
			audio.play();

			// Audio timer - starts at 4s, 9s, 14s, etc. (1s before text changes)
			const audioInterval = setInterval(() => {
				const audio = new Audio(
					indexRef.current % 2 === 0 ? "/tick.mp3" : "/gong1.mp3"
				);
				audio.play();
			}, 5000);

			// Text update timer - changes at 5s, 10s, 15s, etc.
			const intervalId = setInterval(() => {
				setCurrentInstructionIndex((prevIndex) => {
					indexRef.current = (prevIndex + 1) % breathInstructions.length;
					return indexRef.current;
				});
			}, 5000);

			return () => {
				clearInterval(intervalId);
				clearInterval(audioInterval);
			};
		}, []);

		setTimeout(() => {
			goToNextPageState();
		}, 120000);

		return (
			<aside className={`${styles.breathecontainer} animate-fade-in delay-500`}>
				<div className={styles.boxborder}>
					<div className={styles.trail}></div>
				</div>
				<div className={styles.box}>
					<p className={styles.instruction}>
						{breathInstructions[currentInstructionIndex]}
					</p>
				</div>
			</aside>
		);
	}

	function End({ goToNextPageState }) {
		return (
			<div className="flex flex-col justify-between items-center min-h-screen">
				<div className="flex-1 flex items-center">
					<div className={styles.container}>
						<h1 className={styles.titlefadein}>
							Thank you for showing up for yourself.
						</h1>
						<div className="flex items-center gap-2 mt-12">
							<IconButton Icon={SlReload} onClick={goToNextPageState} />
							<p className="text-2xl">Take another session.</p>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}
