<script lang="ts">
	import ProjectView from './projectView.svelte';

	export let project;
	export let password: string;
	export let refresh: () => Promise<void>;

	let link = project.link;
	let description = project.description;
	let time = project.time;
	let distance = project.distance;
	let units = project.units;
	let image = project.image;
	let video = project.video;

	let disabled = false;
	let isDeleted = false;
	async function deleteProject() {
		disabled = true;
		try {
			const res = await fetch(
				`https://7voi3u79k6.execute-api.us-east-1.amazonaws.com/dev/deleteProject`,
				{
					method: 'POST',
					body: JSON.stringify({
						item: project,
						password
					})
				}
			);
			if (res.ok) {
				isDeleted = true;
			}
		} catch (e) {
			console.error(e);
			alert('Delete failed. Did you enter the correct password?');
		}
		disabled = false;
	}

	async function modifyProject() {
		disabled = true;
		try {
			await fetch(`https://7voi3u79k6.execute-api.us-east-1.amazonaws.com/dev/modifyProject`, {
				method: 'POST',
				body: JSON.stringify({
					item: project,
					updated: {
						link,
						description,
						time,
						distance,
						units,
						image,
						video
					},
					password
				})
			});
			await refresh();
		} catch (e) {
			console.error(e);
			alert('Update failed. Did you enter the correct password?');
		}
		disabled = false;
	}
</script>

{#if !isDeleted}
	<ProjectView userProject={project} />

	<div style="text-align:right;">
		<button {disabled} on:click={deleteProject}>Delete</button>
	</div>
	<br /><br />
	Link: <input type="text" bind:value={link} /><br />
	Description:<br /><textarea type="text" bind:value={description} rows={5} cols={40} /><br />
	Time: <input type="text" bind:value={time} /><br />
	Distance:<input type="number" step="0.1" bind:value={distance} /><br />
	Units:
	<select bind:value={units}>
		<option value="englishf">Feet</option>
		<option value="metric">Meters</option>
	</select><br />
	Image: <input type="text" bind:value={image} /><br />
	Video: <input type="text" bind:value={video} /><br />
	<button {disabled} on:click={modifyProject}>Modify</button>
{/if}
