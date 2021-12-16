<script lang="ts">
	import { page } from '$app/stores';

	export let href: string;
	export let base = href;
</script>

{#if base === '/' ? $page.path === base : $page.path.startsWith(base)}
	<div class="active"><slot /></div>
{:else}
	<a {href} sveltekit:prefetch>
		<div>
			<slot />
		</div>
	</a>
{/if}

<style>
	div {
		flex-grow: 1;
		padding: 8px;
		font-weight: 500;
		line-height: 1.25;
		font-family: 'Helvetica', 'Arial', sans-serif;
		font-weight: bold;
		text-align: center;
	}

	a {
		flex-grow: 1;
		text-decoration: none;
		color: #999;
	}

	.active {
		border-bottom: 2px solid black;
		color: black;
	}
</style>
