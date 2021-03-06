import { motion, useDragControls } from 'framer-motion';
import { nanoid } from 'nanoid';
import { PointerEvent, useEffect, useRef, useState } from 'react';
import { getInitialSlot } from '../lib/constants';
import {
	getElementRect,
	getFormatedTime,
	handleTimeslotsMerge,
	yToTime,
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
		const { height: columnHeight, top: columnTop } =
			getElementRect(columnRef);

		const timeClicked = yToTime(e.clientY, columnHeight, columnTop);

		console.log(getFormatedTime(timeClicked));

		// are we hitting some existing timeSlot?
		const hitSomething = timeSlots.find(
			slot => timeClicked >= slot.start && timeClicked <= slot.end
		);

		if (hitSomething) {
			console.log(
				'HIT!!!',
				timeSlots.find(
					slot => timeClicked >= slot.start && timeClicked <= slot.end
				)
			);
			return;
		}

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
			id: nanoid(),
			start: slotStart,
			end: slotEnd,
		};

		const newTimeslots = [...timeSlots, newTimeSlot];

		handleTimeslotsMerge(newTimeSlot, newTimeslots, setTimeSlots);
	}

	function handleHover(e: PointerEvent<HTMLDivElement>) {
		const { height: columnHeight, top: columnTop } =
			getElementRect(columnRef);

		const timeHovered = yToTime(e.clientY, columnHeight, columnTop);
	}

	function handleTimeSlotChange(timeSlot: ITimeSlot) {
		let newTimeslots = timeSlots.map(ts =>
			ts.id !== timeSlot.id ? ts : { ...timeSlot }
		);

		handleTimeslotsMerge(timeSlot, newTimeslots, setTimeSlots);
	}

	useEffect(() => {
		console.log(timeSlots);
	}, [timeSlots]);

	// set initial timeslots
	useEffect(() => {
		!['saturday', 'sunday'].includes(weekDay) &&
			setTimeSlots([getInitialSlot()]);
	}, []);

	return (
		<motion.div
			id="DayColumn"
			drag
			dragControls={dragControls}
			dragListener={false} // prevents drag by directly clicking the element
			onPointerEnter={handleHover}
		>
			<div className="heading" onPointerDown={startDrag}>
				<h4>{weekDay}</h4>
			</div>

			<div
				ref={columnRef}
				className="content"
				onPointerDown={handleClick}
			>
				{timeSlots.map((timeSlot, i) => (
					<TimeSlot
						key={nanoid()}
						timeSlot={timeSlot}
						onPosChange={handleTimeSlotChange}
						constraintsRef={columnRef}
					/>
				))}
			</div>
		</motion.div>
	);
}
