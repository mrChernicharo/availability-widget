import { PointerEvent, useRef, useState } from 'react';
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
		const hourClicked = Math.floor(timeClicked / 60);
		const minuteClicked = Math.floor(timeClicked % 60);
		const formattedHour =
			hourClicked > 10 ? `${hourClicked}` : `0${hourClicked}`;
		const formattedMinute =
			minuteClicked > 10 ? `${minuteClicked}` : `0${minuteClicked}`;

		console.log({
			columnYClick,
			ClickVerticalPercentage,
			timeClicked,
			hourClicked,
			minuteClicked,
		});
		console.log(`${formattedHour}:${formattedMinute}`);

		const newTimeSlot = {
			start: timeClicked,
			end: timeClicked + 60,
		};

		setTimeSlots(ts => [...ts, newTimeSlot]);
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
