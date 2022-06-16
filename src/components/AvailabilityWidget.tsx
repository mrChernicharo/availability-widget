import * as React from 'react';
import { DayColumn } from './DayColumn';

const COLUMN_HEIGHT = 700;

interface IAvailabilityWidgetProps {}

export function AvailabilityWidget() {
	return (
		<div
			id="AvailabilityWidget"
			// @ts-ignore
			style={{ '--column-height': `${COLUMN_HEIGHT}px` }}
		>
			<DayColumn weekDay="monday" />
		</div>
	);
}
