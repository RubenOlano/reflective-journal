<script lang="ts">
	import JournalCard from '$lib/JournalCard.svelte';
	import type { PageData } from './$types';
	import { fade, fly } from 'svelte/transition';

	export let data: PageData;

	const name = data.session?.user.user_metadata.name || '';
</script>

<div class="container" in:fly={{ y: 200, duration: 1000, delay: 400 }} out:fade={{ duration: 200 }}>
	<div class="welcome">
		<h1 class="title">
			Welcome, {name}!
		</h1>
	</div>

	{#if data.journals.length > 0}
		<div class="grid">
			{#each data.journals as journal, i (journal.id)}
				<JournalCard {journal} index={i} />
			{/each}
		</div>
		<div class="new-journal">
			<a class="new-journal-btn" type="button" href="/journal/create"> Create A Journal </a>
		</div>
	{:else}
		<div>
			<h2 class="sub-title">You don't have any journals yet.</h2>
			<p class="text">Click the button below to create one.</p>
			<div class="new-journal">
				<a class="new-journal-btn" type="button" href="/journal/create"> Create A Journal </a>
			</div>
		</div>
	{/if}
</div>

<style>
	.sub-title {
		font-size: 2rem;
		font-weight: 700;
		margin-bottom: 1rem;
	}

	.text {
		font-size: 1.2rem;
		font-weight: 400;
		margin-bottom: 1rem;
	}
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 1rem;
		padding: 1rem;
	}

	.welcome {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	@media (prefers-color-scheme: dark), (prefers-color-scheme: light) {
		.new-journal-btn {
			background-color: #444444;
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		}
	}

	.title {
		font-size: 3rem;
		margin-bottom: 1rem;
		text-align: center;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 1rem;
	}

	.new-journal {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 2rem;
	}

	.new-journal-btn {
		padding: 1rem 2rem;
		border-radius: 0.5rem;
		transition: all 0.2s ease-in-out;
		border: none;
		font: inherit;
		color: inherit;
		cursor: pointer;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		text-decoration: none;
	}

	.new-journal-btn:hover {
		transform: scale(1.05);
	}
</style>
