import type { Point } from './output.types';

export function interpolate(arr: Point[] | number[], i: number): Point | number {
	let min = Math.floor(i),
		max = Math.ceil(i);
	if (max >= arr.length) i = min = max = arr.length - 1;
	if (typeof arr[0] === 'number') {
		return (arr[min] as number) + ((arr[max] as number) - (arr[min] as number)) * (i - min);
	}
	let xDiff = arr[max][0] - arr[min][0];
	let yDiff = arr[max][1] - arr[min][1];
	const weight = i - min;
	xDiff *= weight;
	yDiff *= weight;
	return [arr[min][0] + xDiff, arr[min][1] + yDiff];
}
