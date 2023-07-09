<script lang="ts">
	import { page } from '$app/stores';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import type { Database } from '@/types/database.types';

	export let supabase: SupabaseClient<Database>;

	const signOut = async () => {
		await supabase.auth.signOut();
		window.location.href = '/signin';
	};
</script>

{#if $page.data.session}
	<nav class="nav-container">
		<a class="link" href="/">Dashboard</a>
		<button class="session-btn" on:click={signOut}> Sign Out </button>
	</nav>
{/if}

<style>
	.link {
		display: inline-block;
		padding: 1rem;
		text-decoration: none;
	}

	.session-btn {
		display: inline-block;
		padding: 1rem;
		text-decoration: none;
		background-color: #000;
		color: #fff;
		border: none;
		border-radius: 0.25rem;
		cursor: pointer;
		transition: background-color 0.2s ease-in-out;
	}

	.session-btn:hover {
		background-color: #fa202c;
	}

	.nav-container {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 4rem;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		z-index: 100;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 1rem;
	}

	@media (prefers-color-scheme: dark) {
		.nav-container {
			background-color: #1a202c;
		}

		.link {
			color: #fff;
		}
	}

	@media (prefers-color-scheme: light) {
		.nav-container {
			background-color: #fff;
		}

		.link {
			color: #000;
		}
	}
</style>
