import { motion, useDragControls } from 'framer-motion';
import { PointerEvent, useEffect, useRef, useState } from 'react';
import { getFormatedTime, translateTimeToY } from '../lib/helpers';
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

	function getElementRect(ref: React.RefObject<HTMLDivElement>) {
		const { height, top } = ref.current?.getBoundingClientRect()!;
		return { height, top };
	}

	function getCoords(e: PointerEvent<HTMLDivElement>) {
		const { clientY: clickY } = e;

		const { height: columnHeight, top: columnTop } =
			getElementRect(columnRef);

		return { clickY, columnHeight, columnTop };
	}

	function getCursorTime(
		clickY: number,
		columnHeight: number,
		columnTop: number
	) {
		const columnYClick = clickY - columnTop;
		const ClickVerticalPercentage = (columnYClick / columnHeight) * 100;
		const timeClicked = (ClickVerticalPercentage * 1440) / 100;
		return timeClicked;
	}

	function handleClick(e: PointerEvent<HTMLDivElement>) {
		const { clickY, columnHeight, columnTop } = getCoords(e);
		const timeClicked = getCursorTime(clickY, columnHeight, columnTop);

		const formated = getFormatedTime(timeClicked);

		console.log(`${formated}`);

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

		// are we hitting some existing timeSlot?
		const hitNobody = !timeSlots.find(
			slot => timeClicked >= slot.start && timeClicked <= slot.end
		);

		if (hitNobody) {
			setTimeSlots(ts => [...ts, newTimeSlot]);
		}
	}

	function handleHover(e: PointerEvent<HTMLDivElement>) {
		const { clickY, columnHeight, columnTop } = getCoords(e);
		const timeHovered = getCursorTime(clickY, columnHeight, columnTop);

		console.log('Enter', { timeHovered, y: translateTimeToY(timeHovered) });
	}

	function handleTimeSlotChange(timeSlot) {
		// check if should merge timeslots
		console.log(timeSlot);
	}

	useEffect(() => {
		console.log(timeSlots);
	}, [timeSlots]);

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
						key={i}
						id={i}
						timeSlot={timeSlot}
						onPosChange={handleTimeSlotChange}
						constraintsRef={columnRef}
						containerDims={getElementRect(columnRef)}
					/>
				))}
			</div>
		</motion.div>
	);
}
