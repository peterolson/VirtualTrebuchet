<script lang="ts">
	import InfoIcon from './infoIcon.svelte';

	export let href: string;
	export let title: string;
</script>

<a {href} {title}><InfoIcon /></a>

<style>
	a {
		color: #007;
	}
</style>
