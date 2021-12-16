<script lang="ts">
	import Loader from '../icons/loader.svelte';
	import { email, link, distance, units, description, video, imageURL } from './submitFormStores';

	let error = '';
	let isUploading = false;
	let uploadError = '';
	let isSubmitting = false;
	let successText = '';

	async function onChangeFile(e) {
		uploadError = '';
		const file = e.target.files[0];
		if (!file) return;
		const { name, type, size } = file;
		// max file size is 300kb
		if (size > 300000) {
			uploadError = 'File size is too large. (Max 300kb)';
			return;
		}
		isUploading = true;
		const { signedURL, key, endpoint } = await fetch(
			'https://7voi3u79k6.execute-api.us-east-1.amazonaws.com/dev/getSignedURL',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					fileName: name,
					contentType: type
				})
			}
		).then((res) => res.json());
		const res = await fetch(signedURL, {
			method: 'PUT',
			body: file
		});
		imageURL.set(`${endpoint}/${key}`);
		isUploading = false;
		console.log(res, imageURL);
	}

	async function submit() {
		error = '';
		if (!$imageURL && !$video) {
			error = 'Please upload an image or link to a YouTube video';
			return;
		}
		if (!$distance) {
			error = 'Please enter a distance';
			return;
		}
		if (!$description) {
			error = 'Please enter description of your trebuchet.';
			return;
		}
		if (!$link) {
			error = 'Please enter a link to your trebuchet.';
			return;
		}
		if (!$email) {
			error = 'Please enter your email.';
			return;
		}
		// get current time in format MMMM dd, yyyy
		const date = new Date();
		const month = date.toLocaleString('en-us', { month: 'long' });
		const day = date.getDate();
		const year = date.getFullYear();
		const time = `${month} ${day}, ${year}`;

		const item = {
			link: $link,
			description: $description,
			time,
			distance: $distance,
			units: $units,
			image: $imageURL,
			video: $video
		};

		isSubmitting = true;
		const { message } = await fetch(
			'https://7voi3u79k6.execute-api.us-east-1.amazonaws.com/dev/submitProject',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ item, email: $email })
			}
		).then((res) => res.json());
		isSubmitting = false;
		successText = message;
		email.set('');
		description.set('');
		distance.set(0);
		imageURL.set('');
		video.set('');
	}
</script>

<h2>Submit a trebuchet</h2>

E-mail address&nbsp;<br />
<small>(will not be published)</small>
<br />
<input type="email" bind:value={$email} />
<br />
Link to trebuchet configuration
<br />
<input type="text" bind:value={$link} />
<br />
Actual distance
<br />
<div>
	<input type="number" step="0.1" bind:value={$distance} />
	<select bind:value={$units}>
		<option value="englishf">feet</option>
		<option value="metric">meters</option>
	</select>
</div>
Comments / description
<br />
<textarea rows={8} bind:value={$description} />
<br />
Picture of trebuchet
<br />
<div>
	<input type="file" accept="image/*" on:change={onChangeFile} />
	{#if isUploading}
		<Loader />
	{/if}
</div>
{#if uploadError}
	<div class="error">{uploadError}</div>
{/if}
<div style="margin-bottom: 4px;">
	<small> - OR -</small>
</div>
Video of trebuchet
<br />
<input type="text" bind:value={$video} />
<br />
<small>(enter YouTube link)</small>
<div style="margin: 8px 0;">
	<button on:click={submit} disabled={isSubmitting}>Submit</button>
</div>
{#if error}
	<div class="error">{error}</div>
{/if}
{#if isSubmitting}
	<Loader />
{/if}
{#if successText}
	<div class="success">{successText}</div>
{/if}

<style>
	small {
		opacity: 0.7;
	}
	input,
	textarea,
	select {
		width: 100%;
		margin-top: 2px;
		margin-bottom: 4px;
	}
	div {
		display: flex;
		align-items: center;
	}
	.error {
		color: red;
	}
	.success {
		color: green;
	}
</style>
