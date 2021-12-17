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
	import { inputStores } from './inputStores';

	export let key: string;
	export let units: string;
	export let projectile: string = defaultProjectile;
	export let uniformArm: boolean = false;
	export let updateValue: (key: string, value: number, hideWelcome: boolean) => void;
	export let inputValues: { [key: string]: number } = {};

	const valueStore = inputStores[key];

	let disabled = false;

	$: {
		disabled = false;
		if (projectile && projectile !== 'custom' && key in projectiles[projectile]) {
			valueStore.set(projectiles[projectile][key]);
			const conversion = unitConversions[units][inputUnits[key]];
			valueStore.set(+reverseConversion(conversion)($valueStore).toFixed(3));
			disabled = true;
			updateValue(key, $valueStore, false);
		}
		if (uniformArm) {
			disabled = true;
			const inertiaValues = inertiaProperties(
				inputValues.massArm,
				inputValues.lengthArmLong,
				inputValues.lengthArmShort
			);
			if (key in inertiaValues) {
				let prevValue = $valueStore;
				valueStore.set(+inertiaValues[key]);
				if ($valueStore !== prevValue) {
					updateValue(key, $valueStore, false);
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
			bind:value={$valueStore}
			style={`color:${inputColors[key]}`}
			step="0.1"
			{disabled}
			on:change={() => updateValue(key, $valueStore, true)}
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
