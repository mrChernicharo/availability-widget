import { useState } from 'react';
import { getFormatedTime } from '../lib/helpers';
import { ITimeSlot } from '../lib/types';

interface ITimeSlotProps {
	timeSlot: ITimeSlot;
	onChange: (timeData: ITimeSlot) => void;
}

export function TimeSlot({ timeSlot, onChange }: ITimeSlotProps) {
	const [y, setY] = useState(0);
	const [height, setHeight] = useState(0);

	// getX
	// getHeight
	return (
		<div className="time-slot">
			{/* prettier-ignore */}
			<p>{`${getFormatedTime(timeSlot.start)} - ${getFormatedTime(timeSlot.end)}`}</p>
		</div>
	);
}
