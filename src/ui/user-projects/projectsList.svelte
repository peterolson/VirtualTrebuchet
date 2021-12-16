<script lang="ts">
	import { browser } from '$app/env';

	import { onDestroy, onMount } from 'svelte';

	import ProjectView from './projectView.svelte';
	import type { UserProject } from './userProject.types';

	export let userProjects: UserProject[];

	let limit = 4;

	function onScroll() {
		if (window.scrollY + document.body.clientHeight >= document.body.scrollHeight - 200) {
			limit += 4;
		}
	}

	if (browser) {
		onMount(() => {
			window.addEventListener('scroll', onScroll);
		});

		onDestroy(() => {
			window.removeEventListener('scroll', onScroll);
		});
	}
</script>

<h2>User projects</h2>

<p>
	Check out these real-world trebuchets and see how they compare to the simulation results on
	VirtualTrebuchet.
</p>

<p>Want to share your trebuchet?</p>

{#each userProjects.slice(0, limit) as userProject}
	<ProjectView {userProject} />
{/each}
