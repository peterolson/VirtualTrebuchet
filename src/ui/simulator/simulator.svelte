<script lang="ts">
	import Inputs from '../input/inputs.svelte';
	import * as Comlink from 'comlink';
	import { onMount } from 'svelte';
	import Output from '../output/output.svelte';
	import type { SimulatorOutput } from '../output/output.types';
	import PreviewTrebuchet from '../output/previewTrebuchet.svelte';
	import { page } from '$app/stores';
	import Welcome from './welcome.svelte';

	let simulator: Comlink.Remote<(inputs: Record<string, number>) => SimulatorOutput>;
	let output: SimulatorOutput;
	let input: Record<string, number>;
	let showPreview: boolean = false;

	onMount(() => {
		const worker = new Worker('./simulator.js');
		simulator = Comlink.wrap<(inputs: Record<string, number>) => SimulatorOutput>(worker);
	});

	function onChangeInputs(inputs, hideWelcome) {
		input = inputs;
		if (hideWelcome) {
			showPreview = true;
		}
	}

	async function onSubmit(inputs) {
		showPreview = false;
		input = inputs;
		console.log('input', input);
		output = await simulator(input);
		console.log('output', output);
		return output;
	}
</script>

<main class:hidden={$page.path !== '/'}>
	<div id="input">
		<Inputs {onChangeInputs} {onSubmit} />
	</div>
	<div id="output">
		{#if showPreview}
			<PreviewTrebuchet {input} />
		{:else if output}
			{#key output}
				<Output {output} {input} />
			{/key}
		{:else}
			<Welcome />
		{/if}
	</div>
</main>

<style>
	main {
		display: flex;
		height: 100%;
		width: 100%;
	}

	.hidden {
		display: none;
	}

	#output {
		flex-grow: 1;
	}

	#input {
		padding: 8px;
	}
</style>
