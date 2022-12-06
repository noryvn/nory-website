<script lang="ts">
	import { noryClient } from "$lib/nory";
	import { invalidateAll } from "$app/navigation";
	import { success } from "$lib/components/SvelteToast.svelte"

	export let show
	let name: string;
	let description: string;
	let loading = false;
	let error: Error | null = null
	$: disabled = loading || !name || !description;

	async function onSubmit() {
		try {
			loading = true;
			error = null
			await noryClient.createClass({ name, description });
			await invalidateAll()
			show = false
			name = ""
			description = ""
			success("Berhasil membuat kelas")
		} catch (e) {
			error = e
		} finally {
			loading = false;
		}
	}
</script>

{#if show}
	<form class="form-control bg-base-200 gap-2 p-4 w-full" on:submit|preventDefault={onSubmit}>
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
		<button type="button" class="btn btn-warning" on:click={() => show = false}> Close </button>
	</form>
{/if}