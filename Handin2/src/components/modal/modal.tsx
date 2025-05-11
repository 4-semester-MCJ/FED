import React, { useRef, useEffect } from "react";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
	className?: string;
}

const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	title,
	children,
	className = "",
}) => {
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div
				ref={modalRef}
				className={`bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl mx-4 ${className}`}
			>
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-semibold">{title}</h2>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700"
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
				<div className="mt-4">{children}</div>
			</div>
		</div>
	);
};

export default Modal;
