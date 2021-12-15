/* eslint-disable no-undef */
importScripts('/comlink.js');

function simulator() {
	return 'Hello, world!';
}

Comlink.expose(simulator);
