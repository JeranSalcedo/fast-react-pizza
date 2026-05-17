import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { createOrder } from "../../services/apiRestaurant";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress, getUser } from "../user/userSlice";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";

import store from "../../store";

import Button from "../../ui/Button";
import EmptyCart from "../cart/EmptyCart";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
	/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
		str,
	);

const CreateOrder = () => {
	const dispatch = useDispatch();

	const { userName, status, position, address, error } = useSelector(getUser);
	const isLoading = status === "loading";

	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";

	const formErrors = useActionData();

	const [priority, setPriority] = useState(false);

	const cart = useSelector(getCart);
	const totalCartPrice = useSelector(getTotalCartPrice);
	const priorityPrice = priority ? totalCartPrice * 0.2 : 0;
	const totalPrice = totalCartPrice + priorityPrice;

	if (!cart.length) return <EmptyCart />;

	return (
		<div className="px-4 py-6">
			<h2 className="font-smibold mb-8 text-xl">
				Ready to order? Let&apos;s go!
			</h2>

			<Form method="POST">
				<div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
					<label className="sm:basis-36">First Name</label>
					<input
						className="input grow"
						type="text"
						name="customer"
						defaultValue={userName}
						required
					/>
				</div>

				<div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
					<label className="sm:basis-36">Phone number</label>
					<div className="grow">
						<input
							className="input w-full"
							type="tel"
							name="phone"
							required
						/>
						{formErrors?.phone && (
							<p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
								{formErrors.phone}
							</p>
						)}
					</div>
				</div>

				<div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
					<label className="sm:basis-36">Address</label>
					<div className="grow">
						<input
							className="input w-full"
							type="text"
							name="address"
							defaultValue={address}
							disabled={isLoading}
							required
						/>
						{status === "error" && (
							<p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
								{error}
							</p>
						)}
					</div>

					{!position.latitude && !position.longitude && (
						<span className="absolute right-1 top-[3px] z-50 md:top-[5px]">
							<Button
								type="small"
								onClick={(e) => {
									e.preventDefault();
									dispatch(fetchAddress());
								}}
								disabled={isLoading}
							>
								Get position
							</Button>
						</span>
					)}
				</div>

				<div className="mb-12 flex items-center gap-5">
					<input
						className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
						type="checkbox"
						name="priority"
						id="priority"
						value={priority}
						onChange={(e) => setPriority(e.target.checked)}
					/>
					<label className="font-medium" htmlFor="priority">
						Want to give your order priority?
					</label>
				</div>

				<div>
					<input
						type="hidden"
						name="cart"
						value={JSON.stringify(cart)}
					/>
					<input
						type="hidden"
						name="position"
						value={
							position.latitude && position.longitude
								? `${position.latitude},${position.longitude}`
								: ""
						}
					/>

					<Button disabled={isSubmitting || isLoading}>
						{isSubmitting
							? "Placing order..."
							: `Order now ${formatCurrency(totalPrice)}${priority ? ` (${formatCurrency(totalCartPrice)} + ${formatCurrency(priorityPrice)})` : ""}`}
					</Button>
				</div>
			</Form>
		</div>
	);
};

const action = async ({ request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);

	const order = {
		...data,
		priority: data.priority === "true",
		cart: JSON.parse(data.cart),
	};

	const errors = {};
	if (!isValidPhone(order.phone))
		errors.phone = "Please enter a valid phone number.";
	if (Object.keys(errors).length > 0) return errors;

	const newOrder = await createOrder(order);

	store.dispatch(clearCart());

	return redirect(`/order/${newOrder.id}`);
};

export { CreateOrder as default, action };
