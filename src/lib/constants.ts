// export const COLUMN_HEIGHT = 500;

import { nanoid } from 'nanoid';
import { ITimeSlot } from './types';

// export const COLUMN_HEIGHT = 1768;
export const COLUMN_HEIGHT = 768;

export const getInitialSlot = (): ITimeSlot => {
	const id = nanoid();

	return {
		id,
		start: 9 * 60,
		end: 17 * 60,
	};
};
