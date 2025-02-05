export default function IconButton({ Icon, onClick, link }) {
	if (link) {
		return (
			<a
				href={link}
				target="_blank"
				rel="noopener noreferrer"
				className="p-2 bg-[#273347] rounded-full cursor-pointer"
			>
				<Icon className="w-3 h-3 lg:w-5 lg:h-5 text-white" />
			</a>
		);
	}

	return (
		<div
			className="p-2 bg-[#273347] rounded-full cursor-pointer"
			onClick={onClick}
		>
			<Icon className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
		</div>
	);
}
