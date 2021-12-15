<script lang="ts">
	import Inputs from '../input/inputs.svelte';
	import * as Comlink from 'comlink';
	import { onMount } from 'svelte';
	import Output from '../output/output.svelte';
	import type { SimulatorOutput } from '../output/output.types';
	import PreviewTrebuchet from '../output/previewTrebuchet.svelte';

	let simulator: Comlink.Remote<(inputs: Record<string, number>) => SimulatorOutput>;
	let output: SimulatorOutput;
	let input: Record<string, number>;
	let showPreview: boolean;

	onMount(() => {
		const worker = new Worker('./simulator.js');
		simulator = Comlink.wrap<(inputs: Record<string, number>) => SimulatorOutput>(worker);
	});

	function onChangeInputs(inputs) {
		input = inputs;
		showPreview = true;
	}

	async function onSubmit(inputs) {
		showPreview = false;
		input = inputs;
		output = await simulator(input);
	}
</script>

<main>
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
		{/if}
	</div>
</main>

<style>
	main {
		display: flex;
		height: 100%;
		width: 100%;
	}

	#output {
		flex-grow: 1;
	}

	#input {
		padding: 8px;
	}
</style>
