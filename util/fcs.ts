export const makeTimeStringPretty = (time: string) => {
	const [hour, minutes] = time.split(":");

	const parsedHour = parseInt(hour),
		parsedMinute = parseInt(minutes);

	const convertedHour =
		parsedHour % 12 == 0 ? String(12) : String(parsedHour % 12);

	const convertedMinutes =
		parsedMinute < 10 ? "0" + String(parsedMinute) : String(parsedMinute);

	const isAm = parsedHour < 12;

	return `${convertedHour}:${convertedMinutes}${isAm ? "AM" : "PM"}`;
};
