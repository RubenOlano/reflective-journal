<script lang="ts">
	import Navbar from '$lib/Navbar.svelte';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<svelte:head>
	<title>Reflective Journal</title>
	<meta name="description" content="Reflective Journal" />
</svelte:head>

<div class="nav-padding">
	<Navbar supabase={data.supabase} />
</div>
<slot />

<style>
	:global(html) {
		font-family: 'Inter', sans-serif;
	}

	@media (prefers-color-scheme: dark) {
		:global(body) {
			background-color: #252525;
			color: #fff;
		}
	}

	@media (prefers-color-scheme: light) {
		:global(body) {
			background-color: #fff;
			color: #000;
		}
	}

	.nav-padding {
		padding-bottom: 4rem;
	}
</style>
