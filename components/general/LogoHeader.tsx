import React from "react";
import Logo from "../../public/images/coursor.svg";
import { LogoContainer } from "../general/styledcomponents";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";

const LogoHeader: React.FunctionComponent = () => {
	const { theme } = useTheme();
	const router = useRouter();

	const handleClick = () => {
		router.replace("/");
	};
	return (
		<LogoContainer
			theme={theme}
			onClick={() => {
				handleClick();
			}}
		>
			<img src={Logo} alt={"Image depicting coursor logo"} />
		</LogoContainer>
	);
};

export default LogoHeader;
