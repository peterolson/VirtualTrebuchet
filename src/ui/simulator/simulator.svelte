<script lang="ts">
	import Inputs from '../input/inputs.svelte';
	import * as Comlink from 'comlink';
	import { onMount } from 'svelte';

	let simulator: Comlink.Remote<(inputs: Record<string, number>) => void>;

	onMount(() => {
		const worker = new Worker('./simulator.js');
		simulator = Comlink.wrap<(inputs: Record<string, number>) => void>(worker);
	});

	function onChangeInputs() {}

	async function onSubmit(inputs) {
		console.log(inputs);
		const output = await simulator(inputs);
		console.log(output);
	}
</script>

<Inputs {onChangeInputs} {onSubmit} />
