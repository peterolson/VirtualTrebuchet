<script lang="ts">
	import { page } from '$app/stores';
	export let href: string;
</script>

<li>
	{#if href === '/documentation/' ? $page.path === href : $page.path.startsWith(href)}
		<div class="active"><slot /></div>
	{:else}
		<a {href} sveltekit:prefetch>
			<slot />
		</a>
	{/if}
</li>

<style>
	.active {
		font-weight: bold;
	}
</style>
