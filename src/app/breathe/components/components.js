import React, { useState, useEffect } from "react";
import styles from "../breathe.module.css";

function Breathing({ goToNextPageState }) {
	const [isTransforming, setIsTransforming] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
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
		setIsVisible(true); // Fade in

		// After 2 seconds, start fade out
		const hideIntroTimer = setTimeout(() => {
			setIsVisible(false); // Fade out

			// Wait for fade out to complete before changing content
			setTimeout(() => {
				setShowIntroText(false);

				// Play gong and show circle after intro text
				const soundTimer = setTimeout(() => {
					const audio = new Audio("/gong1.mp3");
					audio.play();
					setIsVisible(true);
					setIsAnimating(true);

					// Start instruction phase
					const instructionInterval = setInterval(() => {
						setCurrentInstructionIndex((prevIndex) => {
							if (prevIndex < breathInstructions.length - 1) {
								return prevIndex + 1;
							}
							// When instructions end, show final text
							clearInterval(instructionInterval);
							setIsVisible(false);
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
			}, 1000); // Match this with the transition duration
		}, 2000);

		return () => clearTimeout(hideIntroTimer);
	}, []);

	return (
		<div className="flex flex-col justify-center items-center">
			{showIntroText ? (
				<h1
					className={`
						text-4xl text-center
						transition-opacity duration-1000 ease-in-out
						${isVisible ? "opacity-100" : "opacity-0"}
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
						className={`${styles.circleborder} ${
							isTransforming ? styles.transformToSquare : ""
						} ${isVisible ? styles.visible : styles.hidden}`}
					></div>
					<div
						className={`${styles.circle} ${
							isTransforming ? styles.transformToSquare : ""
						} ${isVisible ? styles.visible : styles.hidden}`}
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
