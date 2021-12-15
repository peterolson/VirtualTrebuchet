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

	const length = unitLabels[units].length;
	const time = unitLabels[units].time;
	const speed = unitLabels[units].speed;

	function convert(value, type) {
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
					<td>{convert(currentDistance, 'length').toFixed(3)} {length}</td>
					<td>{convert(maxDistance, 'length').toFixed(3)} {length}</td>
				</tr>
				<tr>
					<th>Height</th>
					<td>{convert(currentHeight, 'length').toFixed(3)} {length}</td>
					<td>{convert(maxHeight, 'length').toFixed(3)} {length}</td>
				</tr>
				<tr>
					<th>Time</th>
					<td>{currentTime.toFixed(3)} {time}</td>
					<td>{maxTime.toFixed(3)} {time}</td>
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
					<td
						><DocIcon
							title="Energy efficiency"
							href="http://localhost:3000/documentation/outputs/Efficiency"
						/></td
					>
				</tr>
				<tr>
					<th>Range efficiency</th>
					<td>{(rangeEfficiency * 100).toFixed(3)}%</td>
					<td
						><DocIcon
							title="Range efficiency"
							href="http://localhost:3000/documentation/outputs/Efficiency"
						/></td
					>
				</tr>
				<tr>
					<th>Release velocity</th>
					<td>{convert(releaseVelocity, 'speed').toFixed(3)} {speed}</td>
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
