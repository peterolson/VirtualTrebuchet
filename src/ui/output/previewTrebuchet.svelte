<script lang="ts">
	import type { Point } from './output.types';

	import TrebuchetDisplay from './trebuchetDisplay.svelte';

	export let input: Record<string, number>;

	let displayDiv: HTMLDivElement;

	function getAttributes(input: Record<string, number>) {
		let Aq, Wq, Sq;
		const heightOfPivot = input.heightOfPivot,
			LengthArmLong = input.lengthArmLong,
			LengthSling = input.lengthSling,
			LengthArmShort = input.lengthArmShort,
			PivotToArmCG = input.pivotToArmCG,
			LengthWeight = input.lengthWeight;
		if (Math.abs(heightOfPivot) < Math.abs(LengthArmLong)) {
			Aq = Math.PI - Math.acos(heightOfPivot / LengthArmLong);
			Sq = Math.PI - Math.asin(heightOfPivot / LengthArmLong);
		} else {
			Aq = (14 * Math.PI) / 15;
			if (Math.abs(heightOfPivot) < Math.abs(LengthArmLong) + Math.abs(LengthSling)) {
				Sq =
					(3 * Math.PI) / 2 -
					Aq -
					Math.asin((heightOfPivot - LengthArmLong * Math.cos(Math.PI - Aq)) / LengthSling);
			} else {
				Sq = Math.PI - Aq;
			}
		}
		Wq = -Aq;

		const WeightCG = [
			LengthArmShort * Math.sin(Aq) + LengthWeight * Math.sin(Aq + Wq),
			-LengthArmShort * Math.cos(Aq) - LengthWeight * Math.cos(Aq + Wq)
		] as Point;
		const WeightArm = [LengthArmShort * Math.sin(Aq), -LengthArmShort * Math.cos(Aq)] as Point;
		const ArmSling = [-LengthArmLong * Math.sin(Aq), LengthArmLong * Math.cos(Aq)] as Point;
		const SlingEnd = [
			-LengthArmLong * Math.sin(Aq) - LengthSling * Math.sin(Aq + Sq),
			LengthArmLong * Math.cos(Aq) + LengthSling * Math.cos(Aq + Sq)
		] as Point;
		const Projectile = SlingEnd;
		const ArmCG = [-PivotToArmCG * Math.sin(Aq), PivotToArmCG * Math.cos(Aq)] as Point;

		const xValues = [WeightCG[0], WeightArm[0], ArmSling[0], SlingEnd[0], ArmCG[0]],
			yValues = [WeightCG[1], WeightArm[1], ArmSling[1], SlingEnd[1], ArmCG[1], -heightOfPivot];
		const xmin = 1.2 * Math.min.apply(null, xValues);
		const xmax = 2 * Math.max.apply(null, xValues);
		const ymin = 1.2 * Math.min.apply(null, yValues);
		const ymax = 1.5 * Math.max.apply(null, yValues);

		return {
			minMax: [
				[xmin, ymin],
				[xmax, ymax]
			] as [Point, Point],
			heightOfPivot,
			WeightCG,
			WeightArm,
			ArmSling,
			SlingEnd,
			Projectile,
			ArmCG,
			SlingTension: true,
			projectileDiameter: input.projectileDiameter,
			availableWidth: displayDiv.clientWidth - 24,
			availableHeight: displayDiv.clientHeight - 24,
			projectilePath: []
		};
	}
</script>

<div class="container">
	<div class="display" bind:this={displayDiv}>
		{#if displayDiv}
			{#key input}
				<TrebuchetDisplay {...getAttributes(input)} />
			{/key}
		{/if}
	</div>
	<img src="/MainDiagram.png" alt="Diagram of trebuchet dimensions" width="241" height="203" />
</div>

<style>
	.container {
		display: flex;
		width: 100%;
		height: 100%;
	}

	.display {
		flex-grow: 1;
	}

	img {
		margin: 16px;
	}
</style>
