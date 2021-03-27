import React from "react";
export interface SelectItem {
	id: string;
	selected: boolean;
	name: string;
}

interface CBListProps {
	data: SelectItem[];
}

const CheckBoxList: React.FunctionComponent = () => {
	return <span>sadasd</span>;
};

export default CheckBoxList;
