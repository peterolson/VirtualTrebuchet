export const unitConversions = (function () {
	const id = (x: number) => x;
	return {
		metric: {
			length: id,
			mass: id,
			speed: id,
			inertia: id,
			density: id,
			time: id,
			angle: id
		},
		englishFeet: {
			length: function (x: number) {
				return x * 0.3048;
			},
			mass: function (x: number) {
				return x * 0.4536;
			},
			speed: function (x: number) {
				return x * 0.3048;
			},
			inertia: function (x: number) {
				return x * (0.4536 * Math.pow(0.3048, 2));
			},
			density: function (x: number) {
				return (x * 0.4536) / Math.pow(0.3048, 3);
			},
			time: id,
			angle: id
		},
		englishInches: {
			length: function (x: number) {
				return x * 0.0254;
			},
			mass: function (x: number) {
				return x * 0.4536;
			},
			speed: function (x: number) {
				return x * 0.0254;
			},
			inertia: function (x: number) {
				return x * (0.4536 * Math.pow(0.0254, 2));
			},
			density: function (x: number) {
				return (x * 0.4536) / Math.pow(0.0254, 3);
			},
			time: id,
			angle: id
		}
	};
})();

export function reverseConversion(conversion: (x: number) => number): (x: number) => number {
	return function (x: number): number {
		if (x === 0) return x;
		return x * (x / conversion(x));
	};
}
