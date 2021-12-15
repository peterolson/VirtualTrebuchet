<script lang="ts">
	import { onMount } from 'svelte';
	import { interpolate } from './interpolate';
	import NegativeMass from './negativeMass.svelte';

	import type { Point, SimulatorOutput } from './output.types';
	import Statistics from './statistics.svelte';
	import TrebuchetDisplay from './trebuchetDisplay.svelte';

	export let output: SimulatorOutput;
	export let input: Record<string, number>;

	let i = 0;
	let container: HTMLDivElement;
	let statisticsContainer: HTMLDivElement;

	const frameRate = 60;
	const delay = 1000 / frameRate;
	let time = 0;

	function animate() {
		i = 0;
		let start = +new Date();
		const maxTime = Math.max(...output.Time);
		const playSpeed = input.playSpeed;
		const interval = setInterval(() => {
			time = ((+new Date() - start) / 1000) * playSpeed;
			i = (time / maxTime) * output.Time.length;
			if (time > maxTime) {
				time = maxTime;
				clearInterval(interval);
				return;
			}
		}, delay);
	}

	// interpolate
	function t(arr: Point[], i: number): Point {
		return interpolate(arr, i) as Point;
	}
	function tb(arr: boolean[], i: number): boolean {
		return arr[Math.min(Math.floor(i), arr.length - 1)];
	}

	function hasNegativeMass(input) {
		console.log(input);
		return false;
	}

	onMount(() => {
		console.log(input, output);
		animate();
	});
</script>

<div class="container" bind:this={container}>
	<NegativeMass {input}>
		{#if container && statisticsContainer}
			<TrebuchetDisplay
				minMax={output.MinMax}
				heightOfPivot={input.heightOfPivot}
				projectileDiameter={input.projectileDiameter}
				WeightCG={t(output.WeightCG, i)}
				WeightArm={t(output.WeightArm, i)}
				ArmSling={t(output.ArmSling, i)}
				SlingEnd={t(output.SlingEnd, i)}
				Projectile={t(output.Projectile, i)}
				ArmCG={t(output.ArmCG, i)}
				SlingTension={tb(output.SlingTension, i)}
				availableWidth={container.clientWidth - 24}
				availableHeight={container.clientHeight - 16 - statisticsContainer.clientHeight - 16}
				projectilePath={output.Projectile.slice(0, Math.floor(i)).concat([t(output.Projectile, i)])}
			/>
		{/if}
		<div bind:this={statisticsContainer}>
			<Statistics
				units={String(input.units)}
				errors={output.ErrorMessages}
				currentDistance={t(output.Projectile, i)[0]}
				maxDistance={Math.max(...output.Projectile.map((x) => x[0]))}
				currentHeight={t(output.Projectile, i)[1] + input.heightOfPivot}
				maxHeight={Math.max(...output.Projectile.map((x) => x[1])) + input.heightOfPivot}
				currentTime={time}
				maxTime={Math.max(...output.Time)}
				energyEfficiency={output.EnergyEfficiency}
				rangeEfficiency={output.RangeEfficiency}
				releaseVelocity={output.ReleaseVelocity}
			/>
		</div>
	</NegativeMass>
</div>

<style>
	.container {
		width: 100%;
		height: 100%;
	}
</style>
