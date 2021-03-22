import styled from "styled-components";
import React from "react";

const handleColorType = (type: String) => {
	switch (type) {
		case "Error":
			return "var(--error)";
		case "Success":
			return "var(--success)";
		case "Warning":
			return "var(--warning)";
		default:
			return "var(--accent5)";
	}
};

const NoteWrapper = styled.div<{ type: String }>`
	background-color: ${({ type }) => handleColorType(type)};
	height: 2.5rem;
	width: 100%;
	font-size: 14px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: var(--border-radius);
	margin-bottom: var(--doublegap);
`;

const NoteHeader = styled.span`
	color: white;
	width: 100%;
	margin: 0 10px;
`;

interface NoteProps {
	type: "Error" | "Success" | "Warning" | "";
	message: String;
}

const Note: React.FunctionComponent<NoteProps> = ({
	type,
	message,
}: NoteProps) => {
	return (
		<NoteWrapper type={type}>
			<NoteHeader>
				<strong>{`${type}`}</strong>
				{`: ${message}`}
			</NoteHeader>
		</NoteWrapper>
	);
};

export default Note;
