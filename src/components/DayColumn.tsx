import { PointerEvent, useRef, useState } from 'react';
import {
	formatTimeUnit,
	getHoursFromTime,
	getMinutesFromTime,
	translateTimeToHeight,
	translateTimeToY,
} from '../lib/helpers';
import { TimeSlot } from './TimeSlot';

export interface IDayColumnProps {
	weekDay: string;
}

export function DayColumn({ weekDay }: IDayColumnProps) {
	const [timeSlots, setTimeSlots] = useState<any[]>([]);
	const columnRef = useRef<HTMLDivElement>(null);

	function handleClick(e: PointerEvent<HTMLDivElement>) {
		const { clientY: clickY } = e;
		const { height, top } = columnRef.current?.getBoundingClientRect()!;

		const columnYClick = clickY - top;
		const ClickVerticalPercentage = (columnYClick / height) * 100;
		const timeClicked = (ClickVerticalPercentage * 1440) / 100;

		const hourClicked = getHoursFromTime(timeClicked);
		const minuteClicked = getMinutesFromTime(timeClicked);
		const formattedHour = formatTimeUnit(hourClicked);
		const formattedMinute = formatTimeUnit(minuteClicked);

		console.log(`${formattedHour}:${formattedMinute}`);

		const newTimeSlot = {
			start: timeClicked,
			end: timeClicked + 60,
		};

		setTimeSlots(ts => [...ts, newTimeSlot]);

		translateTimeToY(newTimeSlot.start);
		translateTimeToHeight(newTimeSlot.start, newTimeSlot.end);
	}

	function handleTimeSlotChange(timeSlot) {
		console.log(timeSlot);
	}

	return (
		<div id="DayColumn">
			<div className="heading">
				<h4>{weekDay}</h4>
			</div>

			<div
				ref={columnRef}
				className="content"
				onPointerDown={handleClick}
			>
				{timeSlots.map(timeSlot => (
					<TimeSlot
						key={Math.random()}
						timeSlot={timeSlot}
						onChange={handleTimeSlotChange}
					/>
				))}
			</div>
		</div>
	);
}
