import {} from 'react';
import { getFormatedTime } from '../lib/helpers';
import { ITimeSlot } from '../lib/types';

interface ITimeSlotProps {
	timeSlot: ITimeSlot;
	onChange: (timeData: ITimeSlot) => void;
}

export function TimeSlot({ timeSlot, onChange }: ITimeSlotProps) {
	return (
		<div>
			<p>{`${
				getFormatedTime(timeSlot.start) +
				'-' +
				getFormatedTime(timeSlot.end)
			}`}</p>
		</div>
	);
}
