// Test ID: IIDSAT

import { useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
	remainingMinutes,
	formatCurrency,
	formatDate,
} from "../../utils/helpers";

const Order = () => {
	const {
		id,
		status,
		priority,
		priorityPrice,
		orderPrice,
		estimatedDelivery,
		cart,
	} = useLoaderData();
	const deliveryIn = remainingMinutes(estimatedDelivery);

	return (
		<div>
			<div>
				<h2>Status</h2>

				<div>
					{priority && <span>Priority</span>}
					<span>{status} order</span>
				</div>
			</div>

			<div>
				<p>
					{deliveryIn >= 0
						? `Only ${remainingMinutes(estimatedDelivery)} minutes left 😃`
						: "Order should have arrived"}
				</p>
				<p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
			</div>

			<div>
				<p>Price pizza: {formatCurrency(orderPrice)}</p>
				{priority && (
					<p>Price priority: {formatCurrency(priorityPrice)}</p>
				)}
				<p>
					To pay on delivery:{" "}
					{formatCurrency(orderPrice + priorityPrice)}
				</p>
			</div>
		</div>
	);
};

const loader = async ({ params }) => {
	const order = await getOrder(params.orderId);

	return order;
};

export { Order as default, loader };
