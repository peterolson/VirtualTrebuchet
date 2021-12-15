<script lang="ts">
	import { unitConversions } from './conversions';
	import Divider from './divider.svelte';
	import Input from './input.svelte';
	import { defaultProjectile, defaultValues, inputUnits, projectiles } from './inputData';

	export let onChangeInputs: (inputs: { [key: string]: number }) => void;
	export let onSubmit: (inputs: { [key: string]: number | string }) => void;
	let units = 'englishFeet';
	let projectile = defaultProjectile;
	let uniformArm = true;

	const playSpeeds = [0.01, 0.05, 0.1, 0.25, 0.5, 1, 2, 4, 8, 16, 32];
	let playSpeedIndex = 5;

	let inputValues = defaultValues;

	function toMetric(inputValues) {
		const metricValues = { ...inputValues };
		for (const key in metricValues) {
			metricValues[key] = unitConversions[units][inputUnits[key]](metricValues[key]);
		}
		return metricValues;
	}

	function updateValue(key: string, value: number) {
		inputValues = {
			...inputValues,
			[key]: value
		};
		onChangeInputs(toMetric(inputValues));
	}

	function submit() {
		const metricValues = toMetric(inputValues);
		onSubmit({ ...metricValues, projectile, units, playSpeed: playSpeeds[playSpeedIndex] });
	}

	function reset() {
		inputValues = defaultValues;
		projectile = defaultProjectile;
		uniformArm = true;
		onChangeInputs(toMetric(inputValues));
	}
</script>

<table>
	<tbody>
		<tr>
			<td><label for="units">Units</label></td>
			<td>
				<select id="units" bind:value={units}>
					<option value="metric">Metric</option>
					<option value="englishFeet">English (feet)</option>
					<option value="englishInches">English (inches)</option>
				</select>
			</td>
		</tr>
		<Input key="lengthArmShort" {units} {updateValue} />
		<Input key="lengthArmLong" {units} {updateValue} />
		<Input key="lengthSling" {units} {updateValue} />
		<Input key="lengthWeight" {units} {updateValue} />
		<Input key="heightOfPivot" {units} {updateValue} />
		<Divider />
		<tr>
			<td><label for="uniformArm">Uniform arm</label></td>
			<td>
				<input id="uniformArm" type="checkbox" bind:checked={uniformArm} />
			</td>
		</tr>
		<Input key="massArm" {units} {updateValue} />
		<Input key="inertiaArm" {units} {updateValue} {uniformArm} {inputValues} />
		<Input key="pivotToArmCG" {units} {updateValue} {uniformArm} {inputValues} />
		<Divider />
		<Input key="massWeight" {units} {updateValue} />
		<Input key="inertiaWeight" {units} {updateValue} />
		<Divider />
		<tr>
			<td>
				<label for="projectile">Projectile</label>
			</td>
			<td style="text-align: left;">
				<select id="projectile" bind:value={projectile}>
					<option value="custom">Custom</option>
					{#each Object.keys(projectiles) as projectile}
						<option value={projectile}>{projectiles[projectile].label}</option>
					{/each}
				</select>
			</td>
		</tr>
		<Input key="massProjectile" {units} {updateValue} {projectile} />
		<Input key="projectileDiameter" {units} {updateValue} {projectile} />
		<Input key="windSpeed" {updateValue} {units} />
		<Divider />
		<Input key="releaseAngle" {updateValue} {units} />
		<Divider />
		<tr>
			<td colspan="2">
				<label for="playSpeed">Play speed: <strong>{playSpeeds[playSpeedIndex]}x</strong></label><br
				/>
				<input id="playSpeed" type="range" min="00" max="10" step="1" bind:value={playSpeedIndex} />
			</td>
		</tr>
	</tbody>
</table>
<button on:click={submit}>Submit</button>
<button on:click={reset}>Reset</button>

<style>
	#playSpeed {
		width: 100%;
	}

	table {
		width: 275px;
	}
</style>
