import { writable } from 'svelte/store';

export const email = writable<string>('');
export const link = writable<string>('');
export const distance = writable<number>(0);
export const units = writable<string>('englishf');
export const description = writable<string>('');
export const video = writable<string>('');
export const imageURL = writable<string>('');
