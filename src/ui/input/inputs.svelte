<script lang="ts">
	import { unitConversions } from './conversions';
	import Divider from './divider.svelte';
	import Input from './input.svelte';
	import { defaultProjectile, defaultValues, inputUnits, projectiles } from './inputData';

	let units = 'englishFeet';
	let projectile = defaultProjectile;
	let uniformArm = true;

	let inputValues = defaultValues;

	function updateValue(key: string, value: number) {
		inputValues = {
			...inputValues,
			[key]: value
		};
	}

	function onSubmit() {
		const metricValues = { ...inputValues };
		for (const key in metricValues) {
			metricValues[key] = unitConversions[units][inputUnits[key]](metricValues[key]);
		}
		console.log(metricValues);
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
	</tbody>
</table>
<button on:click={onSubmit}>Submit</button>

<style>
</style>
