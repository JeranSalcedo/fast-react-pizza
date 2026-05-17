import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { updateName } from "./userSlice";
import Button from "../../ui/Button";

const CreateUser = () => {
	const [userName, setUserName] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!userName) return;

		dispatch(updateName(userName));
		navigate("/menu");
	};

	return (
		<form onSubmit={handleSubmit}>
			<p className="mb-4 text-sm text-stone-600 md:text-base">
				👋 Welcome! Please start by telling us your name:
			</p>

			<input
				className="input mb-8 w-72"
				type="text"
				placeholder="Your name"
				value={userName}
				onChange={(e) => setUserName(e.target.value)}
			/>

			{userName !== "" && (
				<div>
					<Button>Start ordering</Button>
				</div>
			)}
		</form>
	);
};

export default CreateUser;
