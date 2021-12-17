<script>
	import Tab from './_tab.svelte';
	import Simulator from '../ui/simulator/simulator.svelte';
	import { page } from '$app/stores';

	let lastDocumentationPage = '/documentation';

	$: {
		if ($page.path.startsWith('/documentation')) {
			lastDocumentationPage = $page.path;
		}
	}
</script>

<div class="root">
	<nav>
		<Tab href="/">Simulator</Tab>
		<Tab base="/documentation" href={lastDocumentationPage}>Documentation</Tab>
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
		overflow-x: auto;
	}

	nav {
		display: flex;
		width: 100%;
		overflow-x: auto;
		white-space: nowrap;
		flex-shrink: 0;
	}
</style>
