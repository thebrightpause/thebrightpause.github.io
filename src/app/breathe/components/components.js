import React, { useState, useEffect } from "react";
import styles from "../breathe.module.css";

function Breathing({ goToNextPageState }) {
	const [isAnimating, setIsAnimating] = useState(false);
	const [introText, setIntroText] = useState("");
	const [showIntroText, setShowIntroText] = useState(true);

	const breathInstructions = [
		"Inhale",
		"Exhale",
		"Inhale",
		"Exhale",
		"Inhale",
		"Exhale",
	];
	const [currentInstructionIndex, setCurrentInstructionIndex] = useState(0);

	useEffect(() => {
		// Show initial text
		setIntroText("Let's start with 3 deep breaths");

		// After 2 seconds, start fade out
		const hideIntroTimer = setTimeout(() => {
			// Wait for fade out to complete before changing content
			setTimeout(() => {
				setShowIntroText(false);

				// Play gong and show circle after intro text
				const soundTimer = setTimeout(() => {
					const audio = new Audio("/gong1.mp3");
					audio.play();
					setIsAnimating(true);

					// Start instruction phase
					const instructionInterval = setInterval(() => {
						setCurrentInstructionIndex((prevIndex) => {
							if (prevIndex < breathInstructions.length - 1) {
								return prevIndex + 1;
							}
							// When instructions end, show final text
							clearInterval(instructionInterval);
							setIsAnimating(false);
							setShowIntroText(true);
							setIntroText("Let's slow down");

							// After final text, move to next phase
							setTimeout(() => {
								setShowIntroText(false);
								goToNextPageState();
							}, 2000);

							return prevIndex;
						});
					}, 3000);

					return () => clearInterval(instructionInterval);
				}, 500);

				return () => clearTimeout(soundTimer);
			}, 1000);
		}, 2000);

		return () => clearTimeout(hideIntroTimer);
	}, []);

	return (
		<div className="flex flex-col justify-center items-center">
			{showIntroText ? (
				<h1
					className={`
						text-4xl text-center
						animate-fade-in
					`}
				>
					{introText}
				</h1>
			) : (
				<aside
					className={`${styles.instructionscontainer} ${
						isAnimating ? styles.circleAnimate : ""
					}`}
				>
					<div
						className={`${styles.circleborder} animate-fade-in`}
					></div>
					<div
						className={`${styles.circle} animate-fade-in`}
					>
						<p className={styles.instruction}>
							{breathInstructions[currentInstructionIndex]}
						</p>
					</div>
				</aside>
			)}
		</div>
	);
}

export default Breathing;
