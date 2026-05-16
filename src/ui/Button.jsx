import { Link } from "react-router-dom";

const Button = ({ children, type = "primary", disabled, to }) => {
	const baseStyle =
		"inline-block rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed ";

	const styles = {
		primary: baseStyle + "px-4 py-3 md:px-6 md:py-4",
		small: baseStyle + "px-4 py-2 md:px-5 md:py-2.5 text-xs",
	};

	if (to)
		return (
			<Link className={styles[type]} to={to}>
				{children}
			</Link>
		);

	return (
		<div className={styles[type]} disabled={disabled}>
			{children}
		</div>
	);
};

export default Button;
