import React, { useEffect } from "react";
import Logo from "../../public/images/coursorLogo.png";
import { LogoContainer, LogoButton } from "../general/styledcomponents";
import { useTheme } from "next-themes";

const LogoHeader = () => {
	return (
		<LogoContainer>
			<img src={Logo} alt={"Image depicting coursor logo"} />
		</LogoContainer>
	);
};

export default LogoHeader;
