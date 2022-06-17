import { COLUMN_HEIGHT } from './constants';

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

//******************//

export function translateTimeToY(startTime: number) {
	const timePerPx = 1440 / COLUMN_HEIGHT;
	const pxPerMinute = COLUMN_HEIGHT / 1440;
	const yPos = startTime * pxPerMinute;

	return yPos;
}
export function translateTimeToHeight(startTime: number, endTime: number) {
	const yPos = translateTimeToY(startTime);
	const yEnd = translateTimeToY(endTime);

	const height = yEnd - yPos;

	return height;
}
