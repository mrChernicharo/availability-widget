import { PointerEvent, useRef } from 'react';

export interface IDayColumnProps {
	weekDay: string;
}

export function DayColumn({ weekDay }: IDayColumnProps) {
	const columnRef = useRef<HTMLDivElement>(null);

	function handleClick(e: PointerEvent<HTMLDivElement>) {
		const { clientY: clickY } = e;
		const { height, top } = columnRef.current?.getBoundingClientRect()!;

		const columnYClick = clickY - top;
		const ClickVerticalPercentage = (columnYClick / height) * 100;
		const minuteClicked = (ClickVerticalPercentage * 1440) / 100;
		const hourClicked = minuteClicked / 60;

		console.log({
			clickY,
			columnYClick,
			ClickVerticalPercentage,
			minuteClicked,
			hourClicked,
		});
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
			></div>
		</div>
	);
}
