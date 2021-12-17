<script lang="ts">
	import DocIcon from '../icons/docIcon.svelte';
	import { reverseConversion, unitConversions } from '../input/conversions';

	import { unitLabels } from '../input/inputData';

	export let currentDistance: number;
	export let maxDistance: number;
	export let currentHeight: number;
	export let maxHeight: number;
	export let currentTime: number;
	export let maxTime: number;
	export let energyEfficiency: number;
	export let rangeEfficiency: number;
	export let releaseVelocity: number;
	export let errors: string[] = [];
	export let units: string;

	if (units === 'englishi') {
		// distance should be shown in feet instead of inches
		units = 'englishf';
	}

	const length = (units) => unitLabels[units].length;
	const time = (units) => unitLabels[units].time;
	const speed = (units) => unitLabels[units].speed;

	function convert(value, type, units) {
		return reverseConversion(unitConversions[units][type])(value);
	}
</script>

<div class="container">
	<div>
		<table>
			<thead>
				<tr>
					<td />
					<th>Current</th>
					<th>Max</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th>Distance</th>
					<td>{convert(currentDistance, 'length', units).toFixed(3)} {length(units)}</td>
					<td>{convert(maxDistance, 'length', units).toFixed(3)} {length(units)}</td>
				</tr>
				<tr>
					<th>Height</th>
					<td>{convert(currentHeight, 'length', units).toFixed(3)} {length(units)}</td>
					<td>{convert(maxHeight, 'length', units).toFixed(3)} {length(units)}</td>
				</tr>
				<tr>
					<th>Time</th>
					<td>{currentTime.toFixed(3)} {time(units)}</td>
					<td>{maxTime.toFixed(3)} {time(units)}</td>
				</tr>
			</tbody>
		</table>
	</div>
	<div>
		<table>
			<tbody>
				<tr>
					<th>Energy efficiency</th>
					<td>{(energyEfficiency * 100).toFixed(3)}%</td>
					<td><DocIcon title="Energy efficiency" href="/documentation/outputs/Efficiency" /></td>
				</tr>
				<tr>
					<th>Range efficiency</th>
					<td>{(rangeEfficiency * 100).toFixed(3)}%</td>
					<td><DocIcon title="Range efficiency" href="/documentation/outputs/Efficiency" /></td>
				</tr>
				<tr>
					<th>Release velocity</th>
					<td>{convert(releaseVelocity, 'speed', units).toFixed(3)} {speed(units)}</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
<div class="container error">
	<ul>
		{#each errors as error}
			<li>{error}</li>
		{/each}
	</ul>
</div>

<style>
	.container {
		display: flex;
		margin: 8px;
		margin-top: 0;
	}

	.error {
		color: red;
	}

	ul {
		margin-block-start: 0px;
		margin-block-end: 0px;
	}

	.container div {
		border: 1px solid #ccc;
		padding: 8px;
	}

	tbody th {
		text-align: right;
	}

	td {
		padding: 0 8px;
		min-width: 80px;
		text-align: center;
	}
</style>
