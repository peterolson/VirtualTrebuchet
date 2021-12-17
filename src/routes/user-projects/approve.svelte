<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	let submittedProjects;
	export const load: Load = async function ({ page, fetch }) {
		const projectsFile = `https://virtual-trebuchet.s3.us-east-2.amazonaws.com/submissionQueue.json`;
		if (!submittedProjects) {
			submittedProjects = await fetch(projectsFile).then((x) => x.json());
		}
		return {
			props: {
				submittedProjects
			}
		};
	};
</script>

<script lang="ts">
	import Authenticate from '../../ui/user-projects/authenticate.svelte';
	import ProjectView from '../../ui/user-projects/projectView.svelte';

	let password = '';

	function onLogin(p) {
		password = p;
	}

	export let submittedProjects;
	let disabled = false;

	async function refresh() {
		submittedProjects = await fetch(
			`https://virtual-trebuchet.s3.us-east-2.amazonaws.com/submissionQueue.json`
		).then((x) => x.json());
	}

	onMount(refresh);

	async function review(item, type) {
		disabled = true;
		try {
			const res = await fetch(
				`https://7voi3u79k6.execute-api.us-east-1.amazonaws.com/dev/${type}Project`,
				{
					method: 'POST',
					body: JSON.stringify({
						item,
						password
					})
				}
			);
			if (!res.ok) {
				alert(type + ' failed. Did you enter the correct password?');
			} else {
				await refresh();
			}
		} catch (e) {
			alert(type + ' failed. Did you enter the correct password?');
		}
		disabled = false;
	}
</script>

<div class="container">
	<h1>Review trebuchet submissions</h1>

	<Authenticate {onLogin}>
		{#each submittedProjects.filter(Boolean) as project}
			<ProjectView userProject={project} />

			<button {disabled} on:click={() => review(project, 'approve')}>Approve</button>
			<button {disabled} on:click={() => review(project, 'reject')}>Reject</button>
		{/each}
	</Authenticate>
</div>

<style>
	.container {
		width: 640px;
		margin: 0 auto;
	}
</style>
