import {} from 'react';
import { ITimeSlot } from '../lib/types';

interface ITimeSlotProps {
	timeSlot: ITimeSlot;
	onChange: (timeData: ITimeSlot) => void;
}

export function TimeSlot({ timeSlot, onChange }: ITimeSlotProps) {
	return (
		<div>
			<p>{`${timeSlot.start + '-' + timeSlot.end}`}</p>
		</div>
	);
}
