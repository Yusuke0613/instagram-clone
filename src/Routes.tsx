import React, { useEffect, VFC } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";

import { useDispatch } from "react-redux";
import { useSelector } from "./store/store";

import { auth, session } from "./firebase";
import { login, isUserAuthenticatedSelector } from "./features/user/userSlice";
import ReactLoader from "./components/loader";

export const Routes: VFC = () => {
	const authenticated = useSelector(isUserAuthenticatedSelector);
	const dispatch = useDispatch();

	const refresh = React.useCallback(
		async (displayName, email) => {
			const userData = {
				displayName,
				email,
			};
			return dispatch(login(userData));
		},
		[dispatch]
	);

	useEffect(() => {
		const f = async () => {
			auth.onAuthStateChanged(async (user) => {
				if (user && !authenticated) {
					return await refresh(user.displayName, user.email);
				}
				if (!user && !authenticated) {
				}
			});
			await auth.setPersistence(session);
		};
		f();
	});

	if (authenticated === undefined) {
		// "unconfirmed" authentication status
		return <ReactLoader />;
	} else {
		// login user Router
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={Login} />
				</Switch>
			</Router>
		);
	}
};
