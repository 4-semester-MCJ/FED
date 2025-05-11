import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/* This button can navigate and do api calls 
Example usage:
<Button 
  apiCall={() => createJob(jobData)}
  onSuccess={(data) => {
    // Navigate after successful creation
    navigate('/jobs');
  }}
  to="/jobs"  // This will only happen if the API call succeeds
>
  Create and View Jobs
</Button>
*/

type ButtonProps = {
	children: React.ReactNode;
	to?: string;
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
	className?: string;
	disabled?: boolean;
	apiCall?: () => Promise<any>;
	onSuccess?: (data: any) => void;
	onError?: (error: any) => void;
	loadingText?: string;
};

const Button: React.FC<ButtonProps> = ({
	children,
	to,
	onClick,
	type = "button",
	className = "",
	disabled = false,
	apiCall,
	onSuccess,
	onError,
	loadingText = "Loading...",
}) => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const handleClick = async () => {
		if (disabled || isLoading) return;

		try {
			if (apiCall) {
				setIsLoading(true);
				const result = await apiCall();
				if (onSuccess) onSuccess(result);
			}

			if (onClick) onClick();
			if (to) navigate(to);
		} catch (error) {
			if (onError) onError(error);
			console.error("Button action failed:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<button
			type={type}
			onClick={handleClick}
			disabled={disabled || isLoading}
			className={`min-w-[60px] w-[20vw] max-w-[300px] px-2 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50 ${className}`}
		>
			{" "}
			{isLoading ? loadingText : children}
		</button>
	);
};

export default Button;
