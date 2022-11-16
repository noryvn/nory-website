<script lang="ts">
	import { noryClient } from "$lib/nory";
	import { goto } from "$app/navigation";

	let name: string;
	let description: string;
	let loading = false;
	$: disabled = loading || name === "" || description === "";

	async function onSubmit() {
		try {
			loading = true;
			await noryClient.createClass({ name, description });
			goto("/user");
		} finally {
			loading = false;
		}
	}
</script>

<main>
	<form class="form-control bg-base-200 gap-2 p-4" on:submit|preventDefault={onSubmit}>
		<label class="input-group w-full">
			<span> Name: </span>
			<input bind:value={name} type="text" name="name" class="grow input input-bordered" />
		</label>
		<label class="input-group">
			<span> Description: </span>
			<input
				bind:value={description}
				type="text"
				name="description"
				class="grow input input-bordered"
			/>
		</label>

		<button type="submit" class="btn btn-primary" class:loading {disabled}> Create </button>
	</form>
</main>

<div class="flex-auto" />
