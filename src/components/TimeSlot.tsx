import { motion, useDragControls } from 'framer-motion';
import { PointerEvent, useEffect, useRef } from 'react';
import { translateTimeToHeight, translateTimeToY } from '../lib/helpers';
import { ITimeSlot } from '../lib/types';

interface ITimeSlotProps {
	id: number;
	timeSlot: ITimeSlot;
	constraintsRef: any;
	containerDims: { height: number; top: number };
	onPosChange: (timeData: ITimeSlot) => void;
}

export function TimeSlot({
	id,
	timeSlot,
	constraintsRef,
	containerDims,
	onPosChange,
}: ITimeSlotProps) {
	const { start, end } = timeSlot;
	const slotRef = useRef<HTMLDivElement>(null);
	// const y = useMotionValue(translateTimeToY(start));

	// time => y
	const [minY, maxY] = [translateTimeToY(0), translateTimeToY(1440)];
	const y = translateTimeToY(start);
	const height = translateTimeToHeight(start, end);

	const dragControls = useDragControls();

	const parseClick = (clickY: number) => clickY - containerDims.top;

	function startDrag(e: PointerEvent<HTMLDivElement>) {
		dragControls.start(e, { snapToCursor: false });
		console.log('startDrag', {
			id,
			y,
			center: y + height / 2,
			click: e.clientY,
			click2: parseClick(e.clientY),
		});
	}
	function modifyTarget(variation: number) {
		console.log('modifyTarget', { id, y, variation /* min, max*/ });

		const newSlot: ITimeSlot = {
			start: start + variation,
			end: end + variation,
		};

		onPosChange(newSlot);

		return variation;
	}

	function endDrag(e: PointerEvent<HTMLDivElement>) {
		// console.log(e);

		// prettier-ignore
		console.log('endDrag', { id, y, click: e.clientY, click2: parseClick(e.clientY) });

		// discover my new clickY
		const newClick = parseClick(e.clientY);
		// get what time

		// emit new TimeSlot up
		// onChange()
	}

	useEffect(() => console.log('changed', { id, y }), [y]);
	useEffect(() => {
		console.log(containerDims);
	}, []);

	return (
		<motion.div
			ref={slotRef}
			dragControls={dragControls}
			onPointerUp={endDrag}
			drag="y"
			dragConstraints={constraintsRef}
			className="time-slot"
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
