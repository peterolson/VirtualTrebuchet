<script lang="ts">
	import { browser } from '$app/env';

	import { page } from '$app/stores';

	import DocIcon from '../icons/docIcon.svelte';
	import LinkIcon from '../icons/linkIcon.svelte';
	import SimulateIcon from '../icons/simulateIcon.svelte';
	import type { SimulatorOutput } from '../output/output.types';
	import { link } from '../user-projects/submitFormStores';

	import { unitConversions } from './conversions';
	import Divider from './divider.svelte';
	import Input from './input.svelte';
	import {
		defaultProjectile,
		defaultValues as defaultInputValues,
		inputUnits,
		projectiles
	} from './inputData';

	export let onChangeInputs: (inputs: { [key: string]: number }, hideWelcome: boolean) => void;
	export let onSubmit: (inputs: { [key: string]: number | string }) => Promise<SimulatorOutput>;
	let units = 'englishf';
	let projectile = defaultProjectile;
	let uniformArm = true;

	const playSpeeds = [0.01, 0.05, 0.1, 0.25, 0.5, 1, 2, 4, 8, 16, 32];
	let playSpeedIndex = 5;

	let defaultValues = consumeURL();

	let inputValues = defaultValues;
	let output: SimulatorOutput;

	function toMetric(inputValues) {
		const metricValues = { ...inputValues };
		for (const key in metricValues) {
			metricValues[key] = unitConversions[units][inputUnits[key]](metricValues[key]);
		}
		return metricValues;
	}

	function updateValue(key: string, value: number, hideWelcome: boolean) {
		inputValues = {
			...inputValues,
			[key]: value
		};
		onChangeInputs({ ...toMetric(inputValues), units, projectile, uniformArm }, hideWelcome);
	}

	async function submit() {
		const metricValues = toMetric(inputValues);
		output = await onSubmit({
			...metricValues,
			projectile,
			units,
			playSpeed: playSpeeds[playSpeedIndex]
		});
	}

	function consumeURL() {
		const params = Object.fromEntries($page.query.entries());
		const inputValues = {};
		for (const key in defaultInputValues) {
			if (key in params) {
				inputValues[key] = +params[key];
			} else {
				inputValues[key] = defaultInputValues[key];
			}
		}
		units = params.units || 'englishf';
		projectile = params.projectile || defaultProjectile;
		uniformArm = params.uniformArm === 'true';

		return inputValues;
	}

	function getURL({ inputValues, output, projectile, uniformArm }) {
		const query = new URLSearchParams({
			...inputValues,
			units,
			projectile,
			uniformArm,
			...(output
				? {
						distance: Math.max(...output.Projectile.map((x) => x[0]))
				  }
				: {})
		}).toString();
		let protocol = 'https';
		if (browser) {
			protocol = window.location.protocol;
		}
		const host = $page.host;
		const part = $page.path;
		const url = `${protocol}//${host}${part}?${query}`;
		link.set(url);
		return url;
	}

	function clickLink(e) {
		e.target.select();
	}
</script>

<table>
	<tbody>
		<tr>
			<td><label for="units">Units</label></td>
			<td>
				<select id="units" bind:value={units}>
					<option value="englishf">English (feet)</option>
					<option value="englishi">English (inches)</option>
					<option value="metric">Metric</option>
				</select>
			</td>
		</tr>
		<Input key="lengthArmShort" {units} {updateValue} {defaultValues} />
		<Input key="lengthArmLong" {units} {updateValue} {defaultValues} />
		<Input key="lengthSling" {units} {updateValue} {defaultValues} />
		<Input key="lengthWeight" {units} {updateValue} {defaultValues} />
		<Input key="heightOfPivot" {units} {updateValue} {defaultValues} />
		<Divider />
		<tr>
			<td><label for="uniformArm">Uniform arm</label></td>
			<td>
				<input id="uniformArm" type="checkbox" bind:checked={uniformArm} />
			</td>
			<td>
				<DocIcon href="/documentation/inputs/arm/UniformArm" title="Uniform arm" />
			</td>
		</tr>
		<Input key="massArm" {units} {updateValue} {defaultValues} />
		<Input key="inertiaArm" {units} {updateValue} {uniformArm} {inputValues} {defaultValues} />
		<Input key="pivotToArmCG" {units} {updateValue} {uniformArm} {inputValues} {defaultValues} />
		<Divider />
		<Input key="massWeight" {units} {updateValue} {defaultValues} />
		<Input key="inertiaWeight" {units} {updateValue} {defaultValues} />
		<Divider />
		<tr>
			<td>
				<label for="projectile">Projectile</label>
			</td>
			<td style="text-align: left;">
				<select id="projectile" bind:value={projectile}>
					{#each Object.keys(projectiles) as projectile}
						<option value={projectile}>{projectiles[projectile].label}</option>
					{/each}
					<option value="custom">Custom</option>
				</select>
			</td>
			<td>
				<DocIcon href="/documentation/inputs/projectile/ProjectileType" title="Projectile type" />
			</td>
		</tr>
		<Input key="massProjectile" {units} {updateValue} {projectile} {defaultValues} />
		<Input key="projectileDiameter" {units} {updateValue} {projectile} {defaultValues} />
		<Input key="windSpeed" {updateValue} {units} {defaultValues} />
		<Divider />
		<Input key="releaseAngle" {updateValue} {units} {defaultValues} />
		<Divider />
		<tr>
			<td>
				<label for="playSpeed">Play speed: <strong>{playSpeeds[playSpeedIndex]}x</strong></label>
			</td>
			<td colspan="2">
				<input id="playSpeed" type="range" min="00" max="10" step="1" bind:value={playSpeedIndex} />
			</td>
		</tr>
		<tr>
			<td colspan="3">
				<button on:click={submit}>
					<SimulateIcon /> Simulate
				</button>
			</td>
		</tr>
		<tr>
			<td colspan="2">Link to save this trebuchet</td>
			<td>
				<DocIcon href="/documentation/Save" title="Saving Your Trebuchet" />
			</td>
		</tr>
		<tr>
			<td colspan="3">
				<LinkIcon />
				<input
					type="text"
					class="saveLink"
					value={getURL({ inputValues, output, projectile, uniformArm })}
					on:click={clickLink}
					readonly
				/>
			</td>
		</tr>
	</tbody>
</table>

<style>
	#playSpeed {
		width: 100%;
	}

	table {
		width: 300px;
	}

	button {
		width: 100%;
		background-color: white;
		border: none;
		background-color: #4299e1;
		color: white;
		font-weight: bold;
		font-size: 18px;
		line-height: 20px;
		border-radius: 0.5rem;
		padding: 0.25rem 1rem;
		cursor: pointer;
		margin: 1px 0;
	}

	button:hover,
	button:active {
		background-color: #2b6cb0;
	}

	.saveLink {
		width: calc(100% - 36px);
	}
</style>
