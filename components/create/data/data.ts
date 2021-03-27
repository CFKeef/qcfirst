export type Option = {
    label: string;
    value: string;
}

export const departments: Option[] = [
    {label: "Biology", value: "BIOL" },
    {label: "Chemistry", value: "CHEM" },
    {label: "Computer Science", value: "CSCI" },
    {label: "Earth Science", value: "EART" },
    {label: "Physics", value: "PHYS" },
    {label: "Mathematics", value: "MATH" },
]

export const semesters = [
	{ value: "fall", label: "Fall" },
	{ value: "winter", label: "Winter" },
	{ value: "spring", label: "Spring" },
	{ value: "summer1", label: "Summer Session 1" },
	{ value: "summer2", label: "Summer Session 2" },
];

export const days = [
    { value: "Sun", label: "Sunday", selected:false },
    { value: "Mon", label: "Monday", selected:false },
    { value: "Tue", label: "Tuesday",selected:false },
    { value: "Wed", label: "Wednesday", selected:false },
    { value: "Thu", label: "Thursday",selected:false },
    { value: "Fri", label: "Friday",selected:false},
    { value: "Sat", label: "Saturday",selected:false },
]