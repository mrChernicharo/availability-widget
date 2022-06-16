import * as React from 'react';
import { DayColumn } from './DayColumn';

interface IAvailabilityWidgetProps {}

export function AvailabilityWidget() {
	return (
		<div id="AvailabilityWidget">
			<DayColumn weekDay="monday" />
		</div>
	);
}
