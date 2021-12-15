<script lang="ts">
	import DocIcon from '../icons/docIcon.svelte';
	import { reverseConversion, unitConversions } from './conversions';

	import {
		inputColors,
		inputTitles,
		inputUnits,
		unitLabels,
		projectiles,
		defaultProjectile,
		inertiaProperties,
		documentationPages
	} from './inputData';

	export let key: string;
	export let units: string;
	export let projectile: string = defaultProjectile;
	export let uniformArm: boolean = false;
	export let updateValue: (key: string, value: number) => void;
	export let inputValues: { [key: string]: number } = {};
	export let defaultValues: { [key: string]: number } = {};

	let value = defaultValues[key];
	let disabled = false;

	$: {
		disabled = false;
		if (projectile && projectile !== 'custom' && key in projectiles[projectile]) {
			value = projectiles[projectile][key];
			const conversion = unitConversions[units][inputUnits[key]];
			value = +reverseConversion(conversion)(value).toFixed(3);
			disabled = true;
			updateValue(key, value);
		}
		if (uniformArm) {
			disabled = true;
			const inertiaValues = inertiaProperties(
				inputValues.massArm,
				inputValues.lengthArmLong,
				inputValues.lengthArmShort
			);
			if (key in inertiaValues) {
				let prevValue = value;
				value = +inertiaValues[key];
				if (value !== prevValue) {
					updateValue(key, value);
				}
			}
		}
	}
</script>

<tr>
	<td>
		<label for={key} style={`color:${inputColors[key]}`}>
			{inputTitles[key]}
		</label>
	</td>
	<td>
		<input
			type="number"
			id={key}
			bind:value
			style={`color:${inputColors[key]}`}
			step="0.1"
			{disabled}
			on:change={() => updateValue(key, value)}
		/>
		{unitLabels[units][inputUnits[key]]}
	</td>
	<td>
		<DocIcon href={documentationPages[key]} title={inputTitles[key]} />
	</td>
</tr>

<style>
	input {
		width: 5em;
	}
</style>
