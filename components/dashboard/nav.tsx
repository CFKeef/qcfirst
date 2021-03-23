import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { ParagraphText } from "../general/styledcomponents";
import { useRouter } from "next/router";

type menuTab = {
	value: string;
	route: string;
};

const Header = styled.header`
	width: 100%;
	border-bottom: 1px solid var(--accent3);
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Content = styled.div`
	width: 100%;

	@media (min-width: 30em) {
		max-width: 1100px;
	}

	@media (max-width: 30em) {
		margin: 0 20px;
		width: calc(100% - 40px);
	}
`;

const Menu = styled.ul`
	padding: 0;
	margin: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 30%;
	height: 3rem;
`;

const MenuOption = styled.li<{ selected: boolean }>`
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom: ${({ selected }) =>
		selected ? " 2px solid var(--accent8)" : "none"};

	height: 100%;
`;

const TabText = styled.a<{ selected: boolean }>`
	font-style: ${({ selected }) => (selected ? "bold" : "normal")};
	font-size: 14px;
	color: ${({ selected }) => (selected ? "var(--text)" : "var(--accent3)")};
`;

const Nav: React.FunctionComponent = () => {
	const router = useRouter();
	/**
	 * Generates the menu component which includes the Nav and the Logo
	 */
	const generateMenu = () => {
		const menuTabs: menuTab[] = [
			{ value: "Overview", route: "/dashboard" },
			{ value: "Academics", route: "/academics" },
			{ value: "Financial", route: "/financial" },
			{ value: "Personal", route: "/personal" },
		];

		return (
			<nav>
				<Menu>
					{menuTabs.map((element, index) => {
						const selected =
							element.route ===
							"/" + router.pathname.split("/")[1];
						console.log(router.pathname);
						return (
							<MenuOption
								key={element.value + index}
								selected={selected}
							>
								<Link href={element.route} passHref={true}>
									<TabText selected={selected}>
										{element.value}
									</TabText>
								</Link>
							</MenuOption>
						);
					})}
				</Menu>
			</nav>
		);
	};

	return (
		<Header id="Header">
			<Content>{generateMenu()}</Content>
		</Header>
	);
};

export default Nav;
