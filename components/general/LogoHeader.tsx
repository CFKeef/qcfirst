import React from "react";
import Logo from "../../public/images/coursorLogo.png";
import { LogoContainer } from "../general/styledcomponents";

const LogoHeader = () => {
	return (
		<LogoContainer>
			<img src={Logo} alt={"Image depicting coursor logo"} />
		</LogoContainer>
	);
};

export default LogoHeader;
