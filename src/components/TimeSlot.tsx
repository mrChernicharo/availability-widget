import { motion, useDragControls, useMotionValue } from 'framer-motion';
import { PointerEvent, useEffect, useRef } from 'react';
import {
	getElementRect,
	translateTimeToHeight,
	translateTimeToY,
	yToTime,
} from '../lib/helpers';
import { ITimeSlot } from '../lib/types';

interface ITimeSlotProps {
	timeSlot: ITimeSlot;
	constraintsRef: any;
	onPosChange: (timeData: ITimeSlot) => void;
}

export function TimeSlot({
	timeSlot,
	constraintsRef,
	onPosChange,
}: ITimeSlotProps) {
	const { id, start, end } = timeSlot;
	const slotRef = useRef<HTMLDivElement>(null);

	// time => y
	const [minY, maxY] = [translateTimeToY(0), translateTimeToY(1440)];
	const y = useMotionValue(translateTimeToY(start));
	// const y = translateTimeToY(start);
	const height = translateTimeToHeight(start, end);

	const dragControls = useDragControls();

	// const parseClick = (clickY: number) => clickY - containerDims.top;

	function startDrag(e: PointerEvent<HTMLDivElement>) {
		dragControls.start(e, { snapToCursor: false });
	}

	function modifyTarget(variation: number) {
		const { top, bottom } = getElementRect(slotRef);
		const { height: columnHeight, top: columnTop } =
			getElementRect(constraintsRef);

		// get what next times are
		let [newStart, newEnd] = [
			yToTime(top, columnHeight, columnTop),
			yToTime(bottom, columnHeight, columnTop),
		];

		const newSlot: ITimeSlot = {
			id,
			start: newStart,
			end: newEnd,
		};

		// emit new TimeSlot up
		onPosChange(newSlot);

		return variation;
	}

	function endDrag(e: PointerEvent<HTMLDivElement>) {}

	useEffect(() => {
		// console.log(containerDims);
	}, []);

	return (
		<motion.div
			ref={slotRef}
			className="time-slot"
			dragControls={dragControls}
			onPointerUp={endDrag}
			drag="y"
			dragConstraints={constraintsRef}
			dragElastic={0}
			dragTransition={{
				modifyTarget,
			}}
			style={{ top: y, height }}
		>
			<div className="top-drag-area">
				{/* {getFormatedTime(start)} */}
			</div>

			<div onPointerDown={startDrag} className="central-area"></div>
			<div className="bottom-drag-area">
				{/* {getFormatedTime(end)} */}
			</div>
			{/* prettier-ignore */}
			{/* <p>{`${getFormatedTime(timeSlot.start)} - ${getFormatedTime(timeSlot.end)}`}</p> */}
		</motion.div>
	);
}
