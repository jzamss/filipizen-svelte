import { writable } from 'svelte/store';

export const processing = writable(false);
export const mode = writable('initial');
