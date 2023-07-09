<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import EntryCard from '@/components/EntryCard.svelte';
	import type { PageData } from './$types';
	import { checkPostedToday } from '@/util';

	export let data: PageData;

	$: postedToday = checkPostedToday(data.journal.entry.at(0));
</script>

<div in:fly={{ delay: 300 }} out:fade>
	<header class="header">
		<h1 class="banner">{data.journal.title}</h1>
		<span class="desc">{data.journal.description}</span>
	</header>

	{#if !postedToday}
		<div class="remind">
			<h1 class="desc">You written anything today!</h1>
			<a href="/journal/{data.id}/create" class="button">New Entry</a>
		</div>
	{/if}

	<main class="entries">
		<div class="grid">
			{#each data.journal.entry as entry, i}
				<EntryCard {entry} index={i} />
			{/each}
		</div>
		{#if postedToday}
			<div class="new-entry">
				<a href="/journal/{data.id}/create" class="button">New Entry</a>
			</div>
		{/if}
	</main>
</div>

<style>
	.new-entry {
		margin-top: 2rem;
	}

	.desc {
		font-size: 1.2rem;
		font-weight: 400;
		margin-bottom: 2rem;
	}

	.button {
		background-color: #fff;
		border-radius: 0.25rem;
		padding: 1rem 2rem;
		box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
		transition: box-shadow 0.2s ease-in-out;
		cursor: pointer;
		text-decoration: none;
		color: #000;
		font-size: 1.2rem;
		font-weight: 400;
	}

	.banner {
		font-size: 3rem;
		font-weight: 700;
		margin-bottom: 1rem;
	}

	.header {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-bottom: 2rem;
		text-align: center;
	}

	.remind {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-bottom: 2rem;
	}

	.entries {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		grid-gap: 1rem;
	}
</style>
