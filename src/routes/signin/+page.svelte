<script lang="ts">
	import { page } from '$app/stores';
	import { Auth } from '@supabase/auth-ui-svelte';
	import { ThemeSupa } from '@supabase/auth-ui-shared';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container">
	<div class="banner">
		<Auth
			supabaseClient={data.supabase}
			appearance={{ theme: ThemeSupa, style: { input: 'color: #fff' } }}
			additionalData={{}}
			view="magic_link"
			showLinks={false}
			providers={['google']}
			redirectTo="{$page.url.origin}/auth/callback"
		/>
	</div>
</div>

<style>
	.container {
		min-height: calc(100vh - 4rem);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.banner {
		margin-bottom: 2rem;
	}
</style>
