export function getHoursFromTime(time: number) {
	return Math.floor(time / 60);
}

export function getMinutesFromTime(time: number) {
	return Math.floor(time % 60);
}

export function formatTimeUnit(time: number) {
	return time >= 10 ? `${time}` : `0${time}`;
}

export function getFormatedTime(time: number) {
	const [h, m] = [getHoursFromTime(time), getMinutesFromTime(time)];

	return `${formatTimeUnit(h)}:${formatTimeUnit(m)}`;
}
