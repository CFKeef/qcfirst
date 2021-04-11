import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { ResetButton } from "../general/styledcomponents";
import { useRouter } from "next/router";
import axios from "axios";
import { SessionUserProps } from "../../pages/dashboard";

type menuTab = {
	value: string;
	route: string;
};

const Header = styled.header`
	width: 100%;
	border-bottom: 2px solid var(--accent3);
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
`;

const Content = styled.div`
	margin: 0 20px;
	width: calc(100% - 40px);
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: row;
	@media (min-width: 30em) {
		max-width: 1100px;
	}

	@media (max-width: 30em) {
		flex-direction: column;
	}
`;

const NavContainer = styled.nav`
	width: 40%;
	height: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	@media (max-width: 30em) {
		width: 100%;
	}
`;

const Menu = styled.ul`
	padding: 0;
	margin: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;

	height: 3rem;

	@media (max-width: 30em) {
		overflow-y: scroll;
	}
`;

const MenuOption = styled.li<{ selected: boolean }>`
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom: ${({ selected }) =>
		selected ? " 2px solid var(--accent8)" : "none"};

	height: 100%;
	margin-right: 1rem;
	&:hover {
		border-bottom: ${({ selected }) =>
			selected
				? " 2px solid var(--accent8)"
				: "2px solid var(--accent5)"};

		a {
			color: ${({ selected }) =>
				selected ? "var(--text)" : "var(--accent5)"};
		}
	}

	&:active {
		scale: 0.95;
	}
`;

const TabText = styled.a<{ selected: boolean }>`
	font-style: ${({ selected }) => (selected ? "bold" : "normal")};
	font-size: 14px;
	color: ${({ selected }) => (selected ? "var(--text)" : "var(--accent3)")};
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;

	@media (max-width: 30em) {
		font-size: 0.9rem;
	}
`;

const LogOutButton = styled(ResetButton)`
	background-color: var(--fg);
	border-radius: var(--border-radius);
	height: 1.75rem;
	width: 5rem;
	color: var(--bg);
	font-size: 14px;
	border: 2px solid var(--fg);

	&:hover {
		opacity: 0.95;
	}

	&:active {
		transform: scale(0.95);
		background-color: var(--error);
		border: none;
	}
`;

const LogoText = styled.h1`
	color: var(--fg);
	margin: 0.5rem 0;
`;

const Nav: React.FunctionComponent<SessionUserProps> = ({ isStudent }) => {
	const router = useRouter();
	/**
	 * Generates the menu component which includes the Nav and the Logo
	 */
	const generateMenu = () => {
		let menuTabs: menuTab[] = [
			{ value: "Overview", route: "/dashboard" },
			{ value: "Create", route: "/create" },
			// { value: "Financial", route: "/financial" },
			// { value: "Personal", route: "/personal" },
		];

		if (isStudent) {
			menuTabs = [
				{ value: "Overview", route: "/dashboard" },
				{ value: "Search", route: "/search" },
			];
		}

		return (
			<NavContainer>
				<Menu>
					{menuTabs.map((element, index) => {
						const selected =
							element.route ===
							"/" + router.pathname.split("/")[1];
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
				<LogOutButton
					onClick={() => {
						handleLogout();
					}}
				>
					Log out
				</LogOutButton>
			</NavContainer>
		);
	};

	const handleLogout = async () => {
		axios.post("/api/logout").then(() => router.push("/"));
	};

	return (
		<Header id="Header">
			<Content>
				<LogoText>Coursor</LogoText>
				{generateMenu()}
			</Content>
		</Header>
	);
};

export default Nav;
