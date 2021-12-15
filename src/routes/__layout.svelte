<script>
	import Tab from './_tab.svelte';
	import Simulator from '../ui/simulator/simulator.svelte';
</script>

<div class="root">
	<nav>
		<Tab href="/">Simulator</Tab>
		<Tab href="/documentation">Documentation</Tab>
		<Tab href="/user-projects">User Projects</Tab>
		<Tab href="/contact">Contact</Tab>
	</nav>
	<slot />
	<Simulator />
</div>

<style>
	.root {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	nav {
		display: flex;
	}
</style>
