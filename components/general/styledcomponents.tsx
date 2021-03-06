import styled from "styled-components";

export const Page = styled.div`
	background-color: var(--bg);
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;
	min-height: -webkit-fill-available;
	min-height: 100vh;
	width: 100vw;
`;

export const CenteredContentPage = styled(Page)`
	justify-content: center !important;
`;

export const Container = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	flex-direction: column;
`;

export const BorderedContainer = styled(Container)`
	@media (min-width: 30em) {
		border: 2px solid var(--accent2);
		border-radius: var(--border-radius);
	}
`;

export const ColumnContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;
	width: 100%;
`;

export const RowContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	flex-direction: row;
`;

export const Header = styled.h2`
	color: var(--text);
	width: 100%;
	text-align: center;
	margin: 0;
`;

export const SubHeader = styled.h2`
	color: var(--text);
	width: 100%;
	text-align: center;
	margin: 1rem 0;
`;

export const InputLabel = styled.label<{ topSpace?: boolean }>`
	font-size: 0.8rem;
	color: var(--accent5);
	text-transform: uppercase;
	margin-bottom: var(--halfgap);
	letter-spacing: var(--letter-spacing);
	width: 100%;
	text-align: left;
	margin-top: ${({ topSpace }) => (topSpace ? 24 : 0)}px;
`;

export const Input = styled.input<{ topSpace?: boolean }>`
	background-color: var(--bg);
	border: 2px solid var(--accent2);
	border-radius: var(--border-radius);
	color: var(--fg);
	height: var(--form-height);
	display: inline-flex;
	padding: 0 var(--halfgap);
	transition: fill 0.15s ease;
	width: 100%;
	box-sizing: border-box;
	margin-top: ${({ topSpace }) => (topSpace ? 24 : 0)}px;
	justify-content: flex-start;
	align-items: center;
	line-height: var(--form-height);

	&:focus {
		border-radius: var(--border-radius);
		border: 2px solid var(--accent5);
		outline: none;

		& + svg {
			transition: fill 0.15s ease;
			path {
				fill: var(--accent5);
			}
		}
	}
`;

export const TextBox = styled.textarea`
	background-color: var(--bg);
	border: 2px solid var(--accent2);
	border-radius: var(--border-radius);
	color: var(--fg);

	display: inline-flex;
	padding: var(--halfgap);
	transition: fill 0.15s ease;
	width: 100%;
	box-sizing: border-box;
	justify-content: flex-start;
	align-items: center;
	resize: none;
	&:focus {
		border-radius: var(--border-radius);
		border: 2px solid var(--accent5);
		outline: none;

		& + svg {
			transition: fill 0.15s ease;
			path {
				fill: var(--accent5);
			}
		}
	}
`;

export const IconInput = styled(Input)`
	padding: 0 var(--halfgap) 0 var(--doublegap);
`;

export const Button = styled.button<{ topSpace?: boolean }>`
	height: var(--form-height);
	width: 100%;
	background-color: var(--fg);
	border: 2px solid var(--fg);
	font-weight: bold;
	letter-spacing: var(--letter-spacing);
	border-radius: var(--border-radius);
	transition: background-color 0.15s ease;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	margin-top: ${({ topSpace }) => (topSpace ? 16 : 0)}px;
	color: var(--bg);

	&:hover {
		background-color: var(--bg);
		cursor: pointer;
		color: var(--fg);
	}
	&:active {
		opacity: 0.9;
	}
`;

export const SlimButton = styled(Button)`
	height: 1.5rem !important;
	font-size: 0.9rem;
	font-weight: normal !important;
`;

export const ParagraphText = styled.span`
	margin: 0;
	padding: 0;
	color: var(--fg);
	font-size: 1rem;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

export const TextLinkAnchor = styled.a`
	color: var(--fg);
	font-size: 1rem;
	font-weight: bold;
	letter-spacing: var(--letter-spacing);

	&:hover {
		cursor: pointer;
		text-decoration: underline;
	}
`;

export const AnchorText = styled(ParagraphText)`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	margin-top: var(--fullgap);
	a {
		margin-left: 0.25rem;
	}
`;

export const AccountForm = styled.form`
	@media (min-width: 30em) {
		width: 20rem;
	}
	@media (max-width: 30em) {
		width: 100%;
	}
`;

export const ResetButton = styled.button`
	border: none;
	margin: 0;
	padding: 0;
	width: auto;
	overflow: visible;
	background: transparent;
	color: inherit;
	font: inherit;
	line-height: normal;
	-webkit-font-smoothing: inherit;
	-moz-osx-font-smoothing: inherit;
	-webkit-appearance: none;

	&:hover {
		cursor: pointer;
	}
`;

export const LogoButton = styled(ResetButton)`
	img {
		height: 1.5rem;
		${({ theme }) =>
			theme === "dark" ? "filter: grayscale(1) invert(1);" : null}
	}
`;

export const LogoContainer = styled.button<{ theme: string }>`
	background: none;
	border: none;
	margin: 0;
	padding: 0;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	&:hover {
		cursor: pointer;
	}
	${({ theme }) =>
		theme === "dark" ? "filter: grayscale(1) invert(1);" : null}
`;

export const ComponentPage = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const ComponentContainer = styled.section`
	margin: 0 20px;
	width: calc(100% - 40px);
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	flex-direction: column;
	max-width: 1100px;
	width: 100%;
`;

export const SemanticAnchorText = styled.div`
	margin: 0;
	padding: 0;
	color: var(--fg);
	font-size: 1rem;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	margin-top: var(--fullgap);
	a {
		margin-left: 0.25rem;
	}
`;
