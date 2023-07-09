<script lang="ts">
	import { checkPostedToday } from '@/util';

	type Journal = {
		id: string;
		title: string;
		description: string;
		entry: { created_at: string }[];
	};
	export let journal: Journal;
	export let index: number;

	$: postedToday = checkPostedToday(journal.entry.at(0));
</script>

<a class="card" href="/journal/{journal.id}" tabindex={index}>
	<h2 class="title">
		{journal.title}
	</h2>
	<p class="desc">
		{journal.description}
	</p>
	{#if !postedToday}
		<p class="no-post">You haven't posted today.</p>
	{/if}
</a>

<style>
	.card {
		background-color: #fff;
		border-radius: 0.25rem;
		padding: 1.5rem;
		box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
		transition: background-color 0.2s ease-in-out;
		cursor: pointer;
		border: none;
		text-decoration: none;
		transition: box-shadow 0.2s ease-in-out;
		max-height: clamp(10rem, 20vw, 20rem);
	}

	.title {
		font-size: 2rem;
		font-weight: 800;
		margin-bottom: 1.5rem;
		text-align: center;
	}

	.desc {
		font-size: 1.2rem;
		font-weight: 400;
		margin-bottom: 1.5rem;
	}

	.card:hover {
		box-shadow: 0 0 1rem rgba(0, 0, 0, 1);
		outline: none;
	}

	.card:focus {
		outline: none;
		box-shadow: 0 0 0.5rem rgba(0, 0, 0, 1);
	}

	@media (prefers-color-scheme: dark) {
		.card {
			background-color: #333;
			color: #fff;
		}
		.card:hover {
			box-shadow: 0 0 1rem rgba(255, 255, 255, 0.2);
		}
	}
	.no-post {
		font-size: 0.8rem;
		font-weight: 400;
		margin-top: 1.5rem;
	}
</style>
