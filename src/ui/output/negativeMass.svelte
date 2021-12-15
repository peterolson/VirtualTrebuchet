<script lang="ts">
	import { inputUnits } from '../input/inputData';

	export let input: Record<string, number>;

	function hasNegativeMass(input) {
		const keys = Object.keys(inputUnits).filter((key) =>
			['mass', 'inertia'].includes(inputUnits[key])
		);
		return keys.some((inputKey) => input[inputKey] < 0);
	}
</script>

{#if hasNegativeMass(input)}
	<div>
		You have entered a negative mass or inertia. This simulation cannot handle negative masses or
		inertias. See the
		<a href="/documentation/NegativeMass" sveltekit:prefetch>
			Negative Mass/Inertia documentation
		</a>.
	</div>
{:else}
	<slot />
{/if}

<style>
	div {
		padding: 16px;
		color: red;
		max-width: 700px;
	}
</style>
