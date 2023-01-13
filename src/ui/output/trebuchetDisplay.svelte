<script lang="ts">
	import { logEvent } from '../../analytics';
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
		[Math.max(-(1.5 * heightOfPivot), minMax[0][0]), -heightOfPivot],
		[Math.min(1.5 * heightOfPivot, minMax[1][0]), -heightOfPivot]
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

	function getSizing(minMax) {
		const min = minMax[0].slice(),
			max = minMax[1].slice();
		min[0] -= 0.1;
		min[1] -= 0.1;
		max[0] += 0.1;
		max[1] += 0.1;
		let width = 1.1 * Math.abs(max[0] - min[0]),
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

	let { min, max, dimensions } = getSizing(minMax);
	let hitBottle = false;
	let hitCastle = false;

	$: {
		({ min, max, dimensions } = getSizing(minMax));
		hitBottle = Projectile[0] > 9.9 && Projectile[0] < 10.1 && Projectile[1] < 0.1;
		hitCastle = Projectile[0] > 500 && Projectile[0] < 560 && Projectile[1] < 5;
		if (hitBottle) {
			logEvent('Collision', {
				target: 'Bottle'
			});
		}
		if (hitCastle) {
			logEvent('Collision', {
				target: 'Castle'
			});
		}
	}

	function svgAttributes() {
		return {
			viewBox: `${min[0]} ${min[1]} ${max[0] - min[0]} ${max[1] - min[1]}`,
			style: `width: ${dimensions[0]}px; height: ${dimensions[1]}px;`
		};
	}

	function l(length, minPixels = 4) {
		const canvasWidth = dimensions[0];
		const width = max[0] - min[0];
		const pixelWidth = width / canvasWidth;
		return Math.max(length, minPixels * pixelWidth);
	}

	function p(percent, minPixels = 4) {
		const smallestDimension = Math.min(max[0] - min[0], max[1] - min[1]);
		const length = Math.min((percent / 100) * smallestDimension, (percent * heightOfPivot) / 10);
		return l(length, minPixels);
	}

	function path(projectilePath) {
		if (!projectilePath.length) {
			return '';
		}
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
	<line {...points(ground())} stroke="#090" stroke-width={p(2)} />
	<line {...points(frame())} stroke="#D86" stroke-width={p(2)} />
	<line {...points(weight())} stroke="#E83" stroke-width={p(2)} />

	<line {...points(shortArm())} stroke="#0AF" stroke-width={p(2)} />
	<line {...points(longArm())} stroke="#A51" stroke-width={p(2)} />
	<line {...points(sling())} stroke={SlingTension ? '#666' : '#F00'} stroke-width={p(0.5)} />
	<circle cx={ArmCG[0]} cy={ArmCG[1]} r={p(1.5)} fill="#F00" />
	<circle cx={WeightCG[0]} cy={WeightCG[1]} r={p(2.5)} fill="#E83" />
	<path
		d={path(projectilePath)}
		fill="none"
		stroke="#ccc"
		stroke-width={p(0.25)}
		stroke-dasharray={`${p(0.25)},${p(0.25)}`}
	/>
	<circle cx={Projectile[0]} cy={Projectile[1]} r={l(projectileDiameter / 2)} fill="#E83" />
	<image
		href="/Target Images/Bottle.png"
		width=".3"
		transform="translate(-.15 .07) scale(1 -1)"
		x={10}
		y={heightOfPivot}
	/>
	{#if hitBottle}
		<image
			href="/Target Images/Broken Bottle.png"
			width=".3"
			transform="translate(-.15 .07) scale(1 -1)"
			x={10}
			y={heightOfPivot}
		/>
	{/if}
	<image
		href="/Target Images/Castle.png"
		width="60"
		transform="translate(-30 32) scale(1 -1)"
		x={530}
		y={heightOfPivot}
	/>
	{#if hitCastle}
		<image
			href="/Target Images/Castle_Broken.png"
			width="60"
			transform="translate(-30 32) scale(1 -1)"
			x={530}
			y={heightOfPivot}
		/>
	{/if}
</svg>

<style>
	svg {
		transform: scaleY(-1);
		border: 1px dashed black;
		margin: 8px;
	}
</style>
