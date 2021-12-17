<script lang="ts">
	import Loader from '../../ui/icons/loader.svelte';

	let message = '';
	let email = '';
	let link = '';
	let error = '';
	let success = '';
	let isSending = false;

	async function sendMessage() {
		isSending = true;
		success = '';
		error = '';
		try {
			const res = await fetch('https://7voi3u79k6.execute-api.us-east-1.amazonaws.com/dev/email', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					message,
					email,
					link
				})
			});
			const response = await res.json();
			if (res.ok) {
				success = response.message;
				message = '';
				email = '';
				link = '';
				error = '';
			} else {
				error = response.message;
				success = '';
			}
		} catch (err) {
			error = 'Could not send message. Please try again later.';
			success = '';
		}
		isSending = false;
	}
</script>

<div class="container">
	<strong>E-mail:</strong> VirtualTrebuchet@gmail.com
	<br /><br />
	<b>Contact Us / Report a Bug</b>
	<br /><br />
	<label for="message">Message / Description of Bug:</label><br />
	<textarea name="message" rows="8" bind:value={message} /><br />
	<label for="link">Link to trebuchet configuration (optional)</label><br />
	<input type="text" name="link" bind:value={link} /><br />
	<label for="email">Your e-mail (if you would like a reply)</label><br />
	<input type="text" name="email" bind:value={email} /><br />
	We will not publish your e-mail address.<br />
	<button disabled={!message || isSending} on:click={sendMessage}>Send</button>
	{#if isSending}
		<Loader />
	{/if}
	<div class="success">
		{success}
	</div>
	<div class="error">
		{error}
	</div>
</div>

<style>
	.container {
		width: 100%;
		max-width: 640px;
		margin: 16px auto;
		padding: 16px;
		box-sizing: border-box;
	}

	textarea {
		width: 100%;
		margin-bottom: 8px;
	}

	input {
		width: 100%;
		margin-bottom: 8px;
	}

	button {
		margin: 8px 0px;
	}

	.success {
		color: green;
	}
	.error {
		color: red;
	}
</style>
