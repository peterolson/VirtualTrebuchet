<script>
	import ProjectsList from '../../ui/user-projects/projectsList.svelte';
	import { userProjects } from './_data';
</script>

<div class="list">
	<ProjectsList {userProjects} />
</div>

<style>
	.list {
		max-width: 640px;
		margin: auto;
	}
</style>
