import { writable } from 'svelte/store';
import { defaultValues } from './inputData';
import type { Writable } from 'svelte/store';

export const inputStores: Record<string, Writable<number>> = {};
for (const key in defaultValues) {
	inputStores[key] = writable(defaultValues[key]);
}

export function setInputs(inputValues: Record<string, number>): void {
	for (const key in inputValues) {
		if (key in inputStores) {
			inputStores[key].set(inputValues[key]);
		}
	}
}
