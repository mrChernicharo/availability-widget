import { useRef, useState } from 'react';
import { translateTimeToHeight, translateTimeToY } from '../lib/helpers';
import { ITimeSlot } from '../lib/types';

interface ITimeSlotProps {
	timeSlot: ITimeSlot;
	onChange: (timeData: ITimeSlot) => void;
}

export function TimeSlot({ timeSlot, onChange }: ITimeSlotProps) {
	const { start, end } = timeSlot;
	const slotRef = useRef<HTMLDivElement>(null);
	const [y, setY] = useState(() => translateTimeToY(start));
	const [height, setHeight] = useState(() =>
		translateTimeToHeight(start, end)
	);

	// getY
	// getHeight

	// useEffect(() => {
	// 	// setY()
	// console.log({ timeSlot, y, height });
	// }, [timeSlot]);
	return (
		<div ref={slotRef} className="time-slot" style={{ top: y, height }}>
			<div className="top-drag-area"></div>
			<div className="central-area"></div>
			<div className="bottom-drag-area"></div>
			{/* prettier-ignore */}
			{/* <p>{`${getFormatedTime(timeSlot.start)} - ${getFormatedTime(timeSlot.end)}`}</p> */}
		</div>
	);
}
