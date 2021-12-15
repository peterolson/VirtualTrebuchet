<script lang="ts">
	import type { Point } from './output.types';

	export let minMax: [Point, Point];
	export let heightOfPivot: number;
	export let WeightCG: Point;
	export let WeightArm: Point;
	export let ArmSling: Point;
	export let SlingEnd: Point;
	export let Projectile: Point;
	export let ArmCG: Point;
	export let SlingTension: boolean;
	export let projectileDiameter: number;
	export let availableWidth: number;
	export let availableHeight: number;
	export let projectilePath: Point[];

	const ground = () => [
		[-(1.5 * heightOfPivot), -heightOfPivot],
		[1.5 * heightOfPivot, -heightOfPivot]
	];

	const frame = () => [
		[0, -heightOfPivot],
		[0, 0]
	];

	const weight = () => [WeightCG, WeightArm];
	const shortArm = () => [WeightArm, [0, 0]];
	const longArm = () => [[0, 0], ArmSling];
	const sling = () => [ArmSling, SlingEnd];

	function points(line) {
		return {
			x1: line[0][0],
			y1: line[0][1],
			x2: line[1][0],
			y2: line[1][1],
			'stroke-linecap': 'round' as 'round'
		};
	}

	function getSizing() {
		const min = minMax[0].slice(),
			max = minMax[1].slice();
		min[0] -= 0.1;
		min[1] -= 0.1;
		max[0] += 0.1;
		max[1] += 0.1;
		let width = Math.abs(max[0] - min[0]),
			height = Math.abs(max[1] - min[1]);
		const aspect = width / height;
		if (width >= height) {
			width = availableWidth;
			height = availableWidth / aspect;
		} else {
			height = availableHeight;
			width = availableHeight * aspect;
		}
		if (height > availableHeight) {
			width /= height / availableHeight;
			height /= height / availableHeight;
		} else if (width > availableWidth) {
			height /= width / availableWidth;
			width /= width / availableWidth;
		}
		return {
			min: min,
			max: max,
			dimensions: [width, height]
		};
	}

	let { min, max, dimensions } = getSizing();

	$: {
		({ min, max, dimensions } = getSizing());
	}

	function svgAttributes() {
		return {
			viewBox: `${min[0]} ${min[1]} ${max[0] - min[0]} ${max[1] - min[1]}`,
			style: `width: ${dimensions[0]}px; height: ${dimensions[1]}px;`
		};
	}

	function l(length, minPixels = 3) {
		const canvasWidth = dimensions[0];
		const width = max[0] - min[0];
		const pixelWidth = width / canvasWidth;
		return Math.max(length, minPixels * pixelWidth);
	}

	function path(projectilePath) {
		const start = projectilePath[0];
		let d = `M ${start[0]},${start[1]}`;
		for (let i = 1; i < projectilePath.length; i++) {
			const point = projectilePath[i];
			d += ` L ${point[0]},${point[1]}`;
		}
		return d;
	}
</script>

<svg {...svgAttributes()} xmlns="http://www.w3.org/2000/svg">
	<path
		d={path(projectilePath)}
		fill="none"
		stroke="#ccc"
		stroke-width={l(0.03, 3)}
		stroke-dasharray={`${l(0.03, 3)},${l(0.03, 3)}`}
	/>
	<line {...points(ground())} stroke="#090" stroke-width={l(heightOfPivot / 5)} />
	<line {...points(frame())} stroke="#D86" stroke-width={l(heightOfPivot / 5)} />
	<line {...points(weight())} stroke="#E83" stroke-width={l(heightOfPivot / 5)} />
	<circle cx={Projectile[0]} cy={Projectile[1]} r={l(projectileDiameter / 2)} fill="#E83" />
	<line {...points(shortArm())} stroke="#0AF" stroke-width={l(heightOfPivot / 5)} />
	<line {...points(longArm())} stroke="#A51" stroke-width={l(heightOfPivot / 5)} />
	<line
		{...points(sling())}
		stroke={SlingTension ? '#666' : '#F00'}
		stroke-width={l(heightOfPivot / 15, 2)}
	/>
	<circle cx={ArmCG[0]} cy={ArmCG[1]} r={l(heightOfPivot / 5)} fill="#F00" />
	<circle cx={WeightCG[0]} cy={WeightCG[1]} r={l(heightOfPivot / 4)} fill="#E83" />
</svg>

<style>
	svg {
		transform: scaleY(-1);
		border: 1px dashed black;
		margin: 8px;
	}
</style>
