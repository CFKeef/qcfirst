import Head from "next/head";
import React from "react";

import { Page } from "../components/general/styledcomponents";
import ThemeToggle from "../components/general/themetoggle";

const Home: React.FunctionComponent = () => {
	return (
		<Page>
			<ThemeToggle />
		</Page>
	);
};

export default Home;
