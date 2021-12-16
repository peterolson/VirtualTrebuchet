<script lang="ts">
	import { browser } from '$app/env';

	import { onDestroy, onMount } from 'svelte';

	import ProjectView from './projectView.svelte';
	import SubmitForm from './submitForm.svelte';
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

<h1>User projects</h1>

<p>
	Check out these trebuchets that people built and see how they compare to the simulation results on
	VirtualTrebuchet.
</p>

{#each userProjects.slice(0, limit) as userProject}
	<ProjectView {userProject} />
{/each}
