import { nanoid } from 'nanoid';
import { COLUMN_HEIGHT } from './constants';
import { ITimeSlot } from './types';

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

export function translateYToTime(y: number) {
	const timePerPx = 1440 / COLUMN_HEIGHT;
}

export function yToTime(
	clickY: number,
	columnHeight: number,
	columnTop: number
) {
	const columnYClick = clickY - columnTop;
	const ClickVerticalPercentage = (columnYClick / columnHeight) * 100;
	const timeClicked = (ClickVerticalPercentage * 1440) / 100;
	return Math.abs(Math.round(timeClicked));
}

// *************************** //

export function getElementRect(ref: React.RefObject<HTMLDivElement>) {
	return ref.current?.getBoundingClientRect()!;
}

export function mergeTimeslots(
	timeSlots: ITimeSlot[],
	overlappingIds: string[]
) {
	const overlapping = timeSlots.filter(item =>
		overlappingIds.includes(item.id)
	);

	const mergedSlot = overlapping.reduce(
		(acc, next) => {
			acc = {
				id: nanoid(),
				start: Math.min(acc.start, next.start),
				end: Math.max(acc.end, next.end),
			};
			return acc;
		},
		{
			id: '',
			start: overlapping[0].start,
			end: overlapping[0].end,
		}
	);

	console.log('mergedSlot', mergedSlot);

	return mergedSlot;
}

export function findOverlappingSlots(
	timeSlot: ITimeSlot,
	newTimeSlots: ITimeSlot[]
) {
	const { start, end } = timeSlot;
	// check if should merge timeslots
	// prettier-ignore
	const overlappingItems = newTimeSlots.filter(
		(s, i) =>
			(start < s.start && start < s.end && end > s.start && end < s.end) || // top overlap
			(start > s.start && start < s.end && end > s.start && end < s.end) || // fit inside
			(start > s.start && start < s.end && end > s.start && end > s.end) || // bottom overlap
			(start < s.start && start < s.end && end > s.start && end > s.end) // encompass
	);
	return overlappingItems;
}
