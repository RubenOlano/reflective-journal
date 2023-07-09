<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import type { PageData } from './$types';

	export let data: PageData;

	$: displayDate = new Date(data.entry.created_at).toLocaleString(undefined, {
		dateStyle: 'short',
		timeStyle: 'short'
	});
</script>

<div class="container" in:fly={{ delay: 400 }} out:fade={{ duration: 260 }}>
	<div class="entry">
		<h1 class="title">
			{data.entry.title}
		</h1>
		<p class="date">
			{displayDate}
		</p>
		<p class="text">
			{data.entry.body}
		</p>
	</div>

	<a class="back-btn" href="/journal/{data.entry.journal_id}"> Back </a>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: auto;
		padding: 2rem;
		max-width: 80vw;
	}

	.back-btn {
		background-color: #4caf50;
		border: none;
		color: white;
		padding: 1rem;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 1.2rem;
		margin: 1rem;
		cursor: pointer;
		border-radius: 1rem;
		transition: background-color 0.2s ease-in-out;
		transition: scale 0.2s ease-in-out;
	}

	.back-btn:hover {
		background-color: #9ccc65;
		scale: 1.1;
	}

	.entry {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 1rem;
		padding: 2rem;
		background-color: #555555;
		border-radius: 1rem;
	}

	.title {
		font-size: 2rem;
		font-weight: 700;
		margin-bottom: 1rem;
	}

	.date {
		font-size: 1.2rem;
		font-weight: 400;
		margin-bottom: 1rem;
	}

	.text {
		font-size: 1.2rem;
		font-weight: 400;
		margin-bottom: 1rem;
	}
</style>
