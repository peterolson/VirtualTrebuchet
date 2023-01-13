const lastTime: Record<string, Date> = {};

export function logEvent(eventName: string, eventDetails: unknown): void {
	const now = new Date();
	if (lastTime[eventName] && now.getTime() - lastTime[eventName].getTime() < 1000) {
		// Don't log the same event more than once per second
		return;
	}
	console.log('logEvent', eventName, eventDetails);
	// Log the event
	if (typeof gtag !== 'undefined') {
		gtag('event', eventName, eventDetails);
	}
	lastTime[eventName] = now;
}
