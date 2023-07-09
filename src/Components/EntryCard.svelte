<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import type { Database } from '@/types/database.types';

	type Entry = Database['public']['Tables']['entry']['Row'];
	export let entry: Entry;
	export let index: number;

	$: displayDate = new Date(entry.created_at).toLocaleString(undefined, {
		timeStyle: 'short',
		dateStyle: 'short'
	});
</script>

<a
	class="card"
	tabindex={index}
	href="/entry/{entry.id}"
	in:fly={{ y: -200, duration: 1500, delay: index * 100 }}
	out:fade
>
	<div class="header">
		<h2 class="title">{entry.title}</h2>
		<p class="date">{displayDate}</p>
	</div>
	<p class="content">{entry.body}</p>
</a>

<style>
	.card {
		background-color: #fff;
		border-radius: 0.25rem;
		padding: 1.5rem;
		box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
		transition: box-shadow 0.2s ease-in-out;
		cursor: pointer;
		text-decoration: none;
		margin: 1rem;
		max-height: 20rem;
		overflow: hidden;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1.5rem;
		flex-direction: column;
	}

	.date {
		font-weight: 400;
		font-size: 0.8rem;
		text-align: start;
		align-self: flex-start;
	}

	.title,
	.content {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.title {
		font-size: 1.5rem;
		font-weight: 800;
	}

	.content {
		font-size: 1.2rem;
		font-weight: 400;
		margin-bottom: 1.5rem;
	}

	.card:hover {
		box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
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
	}

	@media (prefers-color-scheme: dark) {
		.card:hover {
			box-shadow: 0 0 1rem rgba(255, 255, 255, 0.2);
		}
	}
</style>
