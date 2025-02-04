export default function IconButton({ Icon, onClick, link }) {
	if (link) {
		return (
			<a
				href={link}
				target="_blank"
				rel="noopener noreferrer"
				className="p-2 bg-[#273347] rounded-full cursor-pointer"
			>
				<Icon className="w-5 h-5 text-white" />
			</a>
		);
	}

	return (
		<div
			className="p-2 bg-[#273347] rounded-full cursor-pointer"
			onClick={onClick}
		>
			<Icon className="w-5 h-5 text-white" />
		</div>
	);
}
