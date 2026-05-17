import { useFetcher } from "react-router-dom";

import { updateOrder } from "../../services/apiRestaurant";

import Button from "../../ui/Button";

const UpdateOrder = () => {
	const fetcher = useFetcher();

	return (
		<fetcher.Form method="PATCH" className="text-right">
			<Button>Make priority</Button>
		</fetcher.Form>
	);
};

const action = async ({ params }) => {
	const data = { priority: true };

	await updateOrder(params.orderId, data);

	return null;
};

export { UpdateOrder as default, action };
