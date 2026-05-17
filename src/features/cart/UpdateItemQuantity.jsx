import { useDispatch } from "react-redux";

import Button from "../../ui/Button";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

const UpdateItemQuantity = ({ id, quantity }) => {
	const dispatch = useDispatch();

	return (
		<div className="flex items-center gap-2 md:gap-3">
			<Button
				type="round"
				onClick={() => dispatch(increaseItemQuantity(id))}
			>
				+
			</Button>
			<span className="text-sm font-medium">{quantity}</span>
			<Button
				type="round"
				onClick={() => dispatch(decreaseItemQuantity(id))}
			>
				-
			</Button>
		</div>
	);
};

export default UpdateItemQuantity;
