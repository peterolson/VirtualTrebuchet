<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	let userProjects;
	export const load: Load = async function ({ page, fetch }) {
		const projectsFile = `https://virtual-trebuchet.s3.us-east-2.amazonaws.com/userProjects.json`;
		if (!userProjects) {
			userProjects = await fetch(projectsFile).then((x) => x.json());
		}
		return {
			props: {
				userProjects
			}
		};
	};
</script>

<script lang="ts">
	import ModifyProject from '../../ui/user-projects/modifyProject.svelte';
	import Authenticate from '../../ui/user-projects/authenticate.svelte';
	import { onMount } from 'svelte';

	let password = '';

	function onLogin(p) {
		password = p;
	}

	export let userProjects;

	async function refresh() {
		userProjects = await fetch(
			`https://virtual-trebuchet.s3.us-east-2.amazonaws.com/userProjects.json`
		).then((x) => x.json());
	}

	onMount(refresh);
</script>

<div class="container">
	<h1>Modify user projects</h1>

	<Authenticate {onLogin}>
		{#each userProjects.filter(Boolean) as project}
			<ModifyProject {project} {password} {refresh} />
		{/each}
	</Authenticate>
</div>

<style>
	.container {
		width: 640px;
		margin: 0 auto;
	}
</style>
