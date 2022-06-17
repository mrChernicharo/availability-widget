import { motion, useDragControls } from 'framer-motion';
import { PointerEvent, useRef, useState } from 'react';
import {
	formatTimeUnit,
	getHoursFromTime,
	getMinutesFromTime,
} from '../lib/helpers';
import { ITimeSlot } from '../lib/types';
import { TimeSlot } from './TimeSlot';

export interface IDayColumnProps {
	weekDay: string;
}

export function DayColumn({ weekDay }: IDayColumnProps) {
	const [timeSlots, setTimeSlots] = useState<ITimeSlot[]>([]);
	const columnRef = useRef<HTMLDivElement>(null);

	const dragControls = useDragControls();

	function startDrag(e: PointerEvent<HTMLDivElement>) {
		dragControls.start(e, { snapToCursor: false });
	}

	function handleClick(e: PointerEvent<HTMLDivElement>) {
		const { clientY: clickY } = e;
		const { height: ColumnHeight, top: ColumnTop } =
			columnRef.current?.getBoundingClientRect()!;

		const columnYClick = clickY - ColumnTop;
		const ClickVerticalPercentage = (columnYClick / ColumnHeight) * 100;
		const timeClicked = (ClickVerticalPercentage * 1440) / 100;

		const hourClicked = getHoursFromTime(timeClicked);
		const minuteClicked = getMinutesFromTime(timeClicked);
		const formattedHour = formatTimeUnit(hourClicked);
		const formattedMinute = formatTimeUnit(minuteClicked);

		console.log(`${formattedHour}:${formattedMinute}`);

		// are we close to the edges?
		let [slotStart, slotEnd] = [timeClicked - 30, timeClicked + 30];

		if (slotStart < 30) {
			[slotStart, slotEnd] = [0, 60];
		}
		if (slotEnd > 1440) {
			[slotStart, slotEnd] = [1380, 1440];
		}

		// newSlot will span for 1h. The click position will be in the exact middle of the timeSlot
		const newTimeSlot = {
			start: slotStart,
			end: slotEnd,
		};

		// are we hitting some existing slot?
		let hitNobody = true;
		timeSlots.forEach((slot, i) => {
			if (timeClicked >= slot.start && timeClicked <= slot.end) {
				hitNobody = false;
			}
		});

		if (hitNobody) {
			setTimeSlots(ts => [...ts, newTimeSlot]);
		}
	}

	function handleTimeSlotChange(timeSlot) {
		console.log(timeSlot);
	}

	return (
		<motion.div
			id="DayColumn"
			drag
			dragControls={dragControls}
			dragListener={false} // prevents drag by directly clicking the element
		>
			<div className="heading" onPointerDown={startDrag}>
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
		</motion.div>
	);
}
