export type Option = {
	label: string;
	value: string;
};

export const departments: Option[] = [
	{ label: "Biology", value: "BIOL" },
	{ label: "Chemistry", value: "CHEM" },
	{ label: "Computer Science", value: "CSCI" },
	{ label: "Earth Science", value: "EART" },
	{ label: "Physics", value: "PHYS" },
	{ label: "Mathematics", value: "MATH" },
];

export const semesters = [
	{ value: "fall", label: "Fall" },
	{ value: "winter", label: "Winter" },
	{ value: "spring", label: "Spring" },
	{ value: "summer1", label: "Summer Session 1" },
	{ value: "summer2", label: "Summer Session 2" },
];

export const days = [
	{ key: "Sun", label: "Sunday", selected: false },
	{ key: "Mon", label: "Monday", selected: false },
	{ key: "Tue", label: "Tuesday", selected: false },
	{ key: "Wed", label: "Wednesday", selected: false },
	{ key: "Thu", label: "Thursday", selected: false },
	{ key: "Fri", label: "Friday", selected: false },
	{ key: "Sat", label: "Saturday", selected: false },
];

export const statuses = [
	{ value: 0, label: "Open" },
	{ value: 1, label: "Waitlist" },
	{ value: 2, label: "Closed" },
];
