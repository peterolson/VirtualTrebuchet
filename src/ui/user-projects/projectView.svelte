<script lang="ts">
	import { reverseConversion, unitConversions } from '../input/conversions';

	import type { UserProject } from './userProject.types';

	export let userProject: UserProject;

	function getYoutubeId(youtubeURL: string): string {
		if (youtubeURL.includes('/watch?v=')) {
			return youtubeURL.split('/watch?v=')[1].split('&')[0];
		}
		if (youtubeURL.includes('embed/')) {
			return youtubeURL.split('embed/')[1].split('?')[0];
		}
		return youtubeURL.split('youtu.be/')[1];
	}

	const lengthToMetric = unitConversions.englishf.length;
	const lengthFromMetric = reverseConversion(lengthToMetric);

	function formatDistance(distance: number, units: string): string {
		if (units === 'metric') {
			return `<strong>${lengthFromMetric(distance).toFixed(
				1
			)}</strong> feet (<strong>${distance}</strong> meters)`;
		}
		return `<strong>${distance}</strong> feet (<strong>${lengthToMetric(distance).toFixed(
			1
		)}</strong> meters)`;
	}

	function getDistanceFromLink(link: string): number {
		return +(+link.split('distance=')[1].split('&')[0]).toFixed(1);
	}

	function estimationAccuracy(distance, link, units) {
		let actualDistance = distance;
		if (units !== 'metric') {
			actualDistance = lengthToMetric(distance);
		}
		const simulatedDistance = getDistanceFromLink(link);
		const percentError = +(((simulatedDistance - actualDistance) / actualDistance) * 100).toFixed(
			1
		);
		const direction = percentError > 0 ? 'overestimated' : 'underestimated';
		let accuracy =
			'VirtualTrebuchet <strong>' +
			direction +
			'</strong> the actual distance by <strong>' +
			Math.abs(percentError) +
			'%</strong>.';
		if (percentError === 0) {
			accuracy = 'VirtualTrebuchet predicted the actual distance without any error.';
		}
		return accuracy;
	}
</script>

<hr />
<time>{userProject.time}</time>
<div class="description">
	{userProject.description}
</div>
<div class="media">
	{#if userProject.image}
		<img src={userProject.image} alt="trebuchet" />
	{/if}
	{#if userProject.video}
		<iframe
			width="560"
			height="315"
			style={`background-color: black;background-image: url("https://img.youtube.com/vi/${getYoutubeId(
				userProject.video
			)}/hqdefault.jpg");`}
			src={`https://www.youtube.com/embed/${getYoutubeId(userProject.video)}`}
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
		/>
	{/if}
</div>
<div class="statistics">
	<table>
		<thead>
			<tr>
				<th colspan="2">How far does it shoot?</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td class="right secondary">Actual distance</td>
				<td>{@html formatDistance(+userProject.distance, userProject.units)}</td>
			</tr>
			<tr>
				<td class="right secondary">Simulated distance</td>
				<td>{@html formatDistance(getDistanceFromLink(userProject.link), 'metric')}</td>
			</tr>
			<tr>
				<td colspan="2" class="accuracy center secondary">
					{@html estimationAccuracy(+userProject.distance, userProject.link, userProject.units)}
				</td>
			</tr>
			<tr>
				<td colspan="2" class="center">
					<a href={userProject.link}>Link to simulation</a>
				</td>
			</tr>
		</tbody>
	</table>
</div>

<style>
	.media {
		text-align: center;
		padding: 8px;
	}
	img {
		max-width: 560px;
		max-height: 75vh;
	}

	iframe {
		background-size: cover;
	}
	time {
		font-size: 0.8em;
		color: #666;
	}
	.description {
		padding: 8px 0px;
		white-space: pre-wrap;
	}

	.statistics {
		padding: 8px;
	}

	.statistics table {
		width: 400px;
		margin: auto;
	}

	.right {
		text-align: right;
	}

	.accuracy {
		font-size: 0.8em;
	}

	.center {
		text-align: center;
	}

	.secondary {
		opacity: 0.7;
	}
</style>
