import * as React from 'react';
import { COLUMN_HEIGHT } from '../lib/constants';
import { DayColumn } from './DayColumn';

interface IAvailabilityWidgetProps {}

export function AvailabilityWidget() {
	const weekdays = [
		'sunday',
		'monday',
		'tuesday',
		'wednesday',
		'thursday',
		'friday',
		'saturday',
	];

	return (
		<div
			id="AvailabilityWidget"
			// @ts-ignore
			style={{ '--column-height': `${COLUMN_HEIGHT}px` }}
		>
			{/* <DayColumn weekDay="monday" /> */}
			{weekdays.map(day => (
				<DayColumn weekDay={day} />
			))}
		</div>
	);
}
