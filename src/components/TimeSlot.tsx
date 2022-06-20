import { motion, useDragControls, useMotionValue } from 'framer-motion';
import { PointerEvent, useRef } from 'react';
import {
	getElementRect,
	getFormatedTime,
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

	const y = useMotionValue(translateTimeToY(start));
	const height = translateTimeToHeight(start, end);
	const dragControls = useDragControls();

	// console.log({ y: y.get(), height, start });

	function startDrag(e: PointerEvent<HTMLDivElement>) {
		dragControls.start(e, { snapToCursor: false });
	}

	function modifyTarget(variation: number) {
		const { top, bottom } = getElementRect(slotRef);
		const { height: columnHeight, top: columnTop } =
			getElementRect(constraintsRef);

		let [newStart, newEnd] = [
			yToTime(top, columnHeight, columnTop),
			yToTime(bottom, columnHeight, columnTop),
		];

		const newSlot: ITimeSlot = {
			id,
			start: newStart,
			end: newEnd,
		};

		onPosChange(newSlot);

		return variation;
	}

	function endDrag(e: PointerEvent<HTMLDivElement>) {
		// y.updateAndNotify(y.get());
		// y.set(y.get());
	}

	// useEffect(() => {
	// console.log(containerDims);
	// }, []);

	return (
		<motion.div
			ref={slotRef}
			className="time-slot"
			dragControls={dragControls}
			onPointerUp={endDrag}
			drag="y"
			dragConstraints={constraintsRef}
			dragElastic={0}
			dragMomentum={false}
			dragTransition={{
				modifyTarget,
			}}
			style={{ top: y, height }}
		>
			<div className="top-drag-area"></div>

			<div onPointerDown={startDrag} className="central-area">
				{/* {id} */}
				{getFormatedTime(start)} || {getFormatedTime(end)}
			</div>
			<div className="bottom-drag-area"></div>
			{/* prettier-ignore */}
			{/* <p>{`${getFormatedTime(timeSlot.start)} - ${getFormatedTime(timeSlot.end)}`}</p> */}
		</motion.div>
	);
}
