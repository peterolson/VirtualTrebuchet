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
			)}</strong> feet<div><strong>${distance}</strong> meters</div>`;
		}
		return `<strong>${distance}</strong> feet<div><strong>${lengthToMetric(distance).toFixed(
			1
		)}</strong> meters</div>`;
	}

	function getDistanceFromLink(link: string): number {
		if (!link?.includes('distance=')) return 0;
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
		<!--fix for https-->
		<img
			src={userProject.image.replace(
				'http://virtual-trebuchet.s3-website.us-east-2.amazonaws.com/',
				'https://virtual-trebuchet.s3.us-east-2.amazonaws.com/'
			)}
			alt="trebuchet"
		/>
	{/if}
	{#if userProject.video}
		<iframe
			style={`background-image: url("https://img.youtube.com/vi/${getYoutubeId(
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
				<th colspan="2" />
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
					<a
						href={userProject.link}
						on:click={() => setTimeout(() => window.location.reload(), 500)}
					>
						Link to simulation
					</a>
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
		max-width: 100%;
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
		width: 100%;
		max-width: 400px;
		margin: auto;
	}

	td.right {
		text-align: right;
		padding-right: 8px;
		vertical-align: top;
	}

	:global(td.right + td div) {
		opacity: 0.7;
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

	iframe {
		width: 100%;
		max-width: 560px;
		aspect-ratio: 16 / 9;
		background-color: black;
	}
</style>
