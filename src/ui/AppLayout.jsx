import { Outlet, useNavigation } from "react-router-dom";

import LoadingIndicator from "./LoadingIndicator";
import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";

const AppLayout = () => {
	const navigation = useNavigation();
	const isLoading = navigation.state === "loading";

	return (
		<div className="layout">
			{isLoading && <LoadingIndicator />}
			<Header />

			<main>
				<Outlet />
			</main>

			<CartOverview />
		</div>
	);
};

export default AppLayout;
