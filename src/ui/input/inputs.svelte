<script lang="ts">
	import { browser } from '$app/env';

	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	import DocIcon from '../icons/docIcon.svelte';
	import LinkIcon from '../icons/linkIcon.svelte';
	import SimulateIcon from '../icons/simulateIcon.svelte';
	import type { SimulatorOutput } from '../output/output.types';
	import { link } from '../user-projects/submitFormStores';

	import { unitConversions } from './conversions';
	import Divider from './divider.svelte';
	import Input from './input.svelte';
	import { defaultProjectile, defaultValues, inputUnits, projectiles } from './inputData';
	import { setInputs } from './inputStores';

	export let onChangeInputs: (inputs: { [key: string]: number }, hideWelcome: boolean) => void;
	export let onSubmit: (inputs: { [key: string]: number | string }) => Promise<SimulatorOutput>;
	let units = 'englishf';
	let projectile = defaultProjectile;
	let uniformArm = true;

	const playSpeeds = [0.01, 0.05, 0.1, 0.25, 0.5, 1, 2, 4, 8, 16, 32];
	let playSpeedIndex = 5;

	let inputValues = defaultValues;
	let output: SimulatorOutput;

	onMount(() => {
		// load values from url params
		if (window.location.search.length > 1) {
			inputValues = consumeURL(new URLSearchParams(window.location.search));
			setInputs(inputValues);
		}
	});

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

	function consumeURL(query: URLSearchParams) {
		const params = Object.fromEntries(query.entries());
		const inputValues: any = {};
		for (const key in defaultValues) {
			if (key in params) {
				inputValues[key] = +params[key].replace(/,/, '.');
			} else {
				inputValues[key] = defaultValues[key];
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
		const url = `${protocol}//${host}/?${query}`;
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
			<td>
				<DocIcon href="/documentation/inputs/arm/UniformArm" title="Uniform arm" />
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
		<Input key="massProjectile" {units} {updateValue} {projectile} />
		<Input key="projectileDiameter" {units} {updateValue} {projectile} />
		<Input key="windSpeed" {updateValue} {units} />
		<Divider />
		<Input key="releaseAngle" {updateValue} {units} />
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

	@media (max-width: 725px) {
		table {
			width: 100%;
		}
	}
</style>
