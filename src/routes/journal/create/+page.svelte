<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<div class="form-container" in:fly={{ delay: 400 }} out:fade>
	{#if form?.missing}
		<p class="error">Please fill out all fields</p>
	{/if}
	{#if form?.success}
		<p class="success">Journal created successfully!</p>
		<a class="success-btn" href="/journal/{form?.id}"> To Journal </a>
	{/if}
	<form class="form" method="POST">
		<h1 class="title">New Journal</h1>
		<label class="label" for="title">
			<input
				class="title-input"
				placeholder="New Journal"
				name="title"
				value={form?.title ?? ''}
				required
			/>
		</label>

		<label class="label" for="body">
			<textarea
				class="input text-area"
				placeholder="This is a new journal."
				name="description"
				value={form?.description?.toString() ?? ''}
				required
			/>
		</label>
		<button class="submit-btn" type="submit">Create</button>
	</form>
</div>

<style>
	.form-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.form {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 50%;
	}

	@media (max-width: 768px) {
		.form {
			width: 80%;
		}
	}

	.title {
		font-size: 3rem;
		font-weight: 700;
		margin-bottom: 1rem;
		text-align: center;
	}

	.label {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		margin-bottom: 1rem;
	}

	.title-input {
		width: 100%;
		padding: 1rem;
		border-radius: 0.25rem;
		border: 1px solid #ccc;
		font-size: 1.2rem;
		font-weight: 400;
	}

	.text-area {
		width: 100%;
		height: 20rem;
		padding: 1rem;
		border-radius: 0.25rem;
		border: 1px solid #ccc;
		font-size: 1.2rem;
		font-weight: 400;
	}

	.submit-btn {
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

	.submit-btn:hover {
		box-shadow: 0 0 1rem rgba(0, 0, 0, 1);
	}

	.submit-btn:focus {
		outline: none;
		box-shadow: 0 0 1rem rgba(0, 0, 0, 1);
	}

	.error {
		color: red;
		font-size: 1.2rem;
		font-weight: 400;
	}

	.success {
		color: green;
		font-size: 1.2rem;
		font-weight: 400;
	}

	.success-btn {
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
		margin-top: 1rem;
	}
</style>
