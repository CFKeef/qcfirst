import React, { Component, useEffect } from "react";
import Router from "next/router";
import { NextPageContext } from "next";

export const login = ({ email }) => {
	Router.push("/dashboard");
};

export const logout = async () => {
	await fetch("api/logout");

	window.localStorage.setItem("logout", Date.now().toString());

	Router.push("/login");
};

export const withAuthSync = (Component) => {
	const Wrapper = (props: NextPageContext) => {
		const syncLogout = (event) => {
			if (event.key === "logout") {
				Router.push("/login");
			}
		};
		useEffect(() => {
			window.addEventListener("storage", syncLogout);

			return () => {
				window.removeEventListener("storage", syncLogout);
				window.localStorage.removeItem("logout");
			};
		}, []);

		return <Component {...props} />;
	};

	return Wrapper;
};
