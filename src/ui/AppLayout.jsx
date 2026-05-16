import { Outlet, useNavigation } from "react-router-dom";

import LoadingIndicator from "./LoadingIndicator";
import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";

const AppLayout = () => {
	const navigation = useNavigation();
	const isLoading = navigation.state === "loading";

	return (
		<div className="grid h-screen grid-rows-[auto_1fr_auto]">
			{isLoading && <LoadingIndicator />}
			<Header />

			<div className="overflow-scroll">
				<main className="mx-auto max-w-3xl">
					<Outlet />
				</main>
			</div>

			<CartOverview />
		</div>
	);
};

export default AppLayout;
