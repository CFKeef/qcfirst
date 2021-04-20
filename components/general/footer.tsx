import Link from "next/link";
import React from "react";
import styled from "styled-components";
import ThemeToggle from "./themetoggle";

const FooterContainer = styled.footer`
	width: 100%;
	margin-top: auto;
	display: flex;
	justify-content: space-evenly;
	align-items: flex-start;
	flex-direction: row;
	@media (min-width: 30em) {
		width: 50%;
		max-width: 1100px;
	}
`;

const Column = styled.div`
	width: 40%;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	flex-direction: column;
	margin: 1rem 0;
`;

const ColumnHeader = styled.span`
	color: var(--text);
	text-align: center;
	font-size: 1rem;
	letter-spacing: var(--letterspacing);
	font-weight: 600;

	margin: 0.5rem 0;
	@media (max-width: 30em) {
		width: 100%;
	}
	@media (min-width: 30em) {
		width: 75%;
	}
	font-size: 0.8rem;
`;

export const ColumnEntry = styled.a`
	font-size: 0.8rem;
	margin: 0.5rem 0;
	color: var(--text);
	text-decoration: none;
`;

const BottomContainer = styled.div`
	margin-top: auto !important;
	border-top: 2px solid var(--accent3);
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

interface FooterProps {
	isStudent: boolean;
}

const Footer: React.FunctionComponent<FooterProps> = ({
	isStudent,
}: FooterProps): JSX.Element => {
	return (
		<BottomContainer>
			<FooterContainer>
				<Column>
					<ColumnHeader>Pages</ColumnHeader>
					<Link href={"/"} passHref={true}>
						<ColumnEntry href={"/"}>Home</ColumnEntry>
					</Link>
					{isStudent ? (
						<Link href={"/search"} passHref={true}>
							<ColumnEntry href={"/search"}>Search</ColumnEntry>
						</Link>
					) : (
						<Link href={"/create"} passHref={true}>
							<ColumnEntry href={"/create"}>Create</ColumnEntry>
						</Link>
					)}
				</Column>
				<Column>
					<ThemeToggle />
				</Column>
			</FooterContainer>
		</BottomContainer>
	);
};

export default Footer;
