<script lang="ts">
	export let onLogin: (password: string) => void;
	let password = '';
	let authenticated = false;

	function login() {
		authenticated = true;
		onLogin(password);
	}
</script>

{#if authenticated}
	<slot />
{:else}
	<input type="password" bind:value={password} />
	<button on:click={login}>Login</button>
{/if}
