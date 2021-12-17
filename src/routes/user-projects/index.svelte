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

<script>
	import SubmitForm from '../../ui/user-projects/submitForm.svelte';
	import ProjectsList from '../../ui/user-projects/projectsList.svelte';
	import { onMount } from 'svelte';

	export let userProjects;

	onMount(async () => {
		const projectsFile = `https://virtual-trebuchet.s3.us-east-2.amazonaws.com/userProjects.json`;
		if (!userProjects) {
			userProjects = await fetch(projectsFile).then((x) => x.json());
		}
	});
</script>

<div class="container">
	<div class="submitForm">
		<SubmitForm />
	</div>
	<div class="list">
		<ProjectsList {userProjects} />
	</div>
</div>

<style>
	.container {
		display: flex;
	}
	.container div {
		padding: 16px;
	}
	.submitForm {
		width: 284px;
	}
	.list {
		max-width: 640px;
	}
</style>
