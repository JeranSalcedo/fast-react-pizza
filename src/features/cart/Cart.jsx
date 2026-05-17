import { useDispatch, useSelector } from "react-redux";

import { getUserName } from "../user/userSlice";
import { clearCart, getCart } from "./cartSlice";

import EmptyCart from "./EmptyCart";
import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";

const Cart = () => {
	const dispatch = useDispatch();

	const userName = useSelector(getUserName);
	const cart = useSelector(getCart);

	if (!cart.length) return <EmptyCart />;

	return (
		<div className="px-4 py-3">
			<LinkButton to="/menu">&larr; Back to menu</LinkButton>

			<h2 className="mt-7 text-xl font-semibold">
				Your cart, {userName}
			</h2>

			<ul className="mt-3 divide-y divide-stone-200 border-b">
				{cart.map((item) => (
					<CartItem key={item.pizzaId} item={item} />
				))}
			</ul>

			<div className="mt-6 flex items-center space-x-2">
				<Button to="/order/new">Order pizzas</Button>
				<Button type="secondary" onClick={() => dispatch(clearCart())}>
					Clear cart
				</Button>
			</div>
		</div>
	);
};

export default Cart;
