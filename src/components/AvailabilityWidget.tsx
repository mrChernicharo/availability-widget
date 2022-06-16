import * as React from 'react';
import { COLUMN_HEIGHT } from '../lib/constants';
import { DayColumn } from './DayColumn';

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
