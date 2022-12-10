<script lang="ts">
	import type { Class } from "$lib/nory";
	import { noryClient } from "$lib/nory";
	import { invalidateAll } from "$app/navigation";
	import * as toast from "$lib/components/SvelteToast.svelte";

	export let classInfo: Class;

	let loading = false;
	let error: Error | null = null;

	let name = "";

	$: disabled = loading || name === "";

	async function updateClass() {
		try {
			loading = true;
			await noryClient.updateClass({
				classId: classInfo.classId,
				name
			});
			name = "";
			toast.success("Berhasil meng edit kelas");
		} catch (e) {
			error = e;
			toast.warning(e.message);
		} finally {
			loading = false;
		}
	}
</script>

<form class="form-control" on:submit|preventDefault={updateClass}>
	<label class="label" for="class-name-input">
		<span class="label-text"> Nama </span>
	</label>
	<input
		type="text"
		class="input input-bordered"
		name="class-name"
		id="class-name-input"
		autocomplete="off"
		bind:value={name}
	/>
	<button type="submit" class="btn btn-primary mt-4" {disabled}> Edit </button>
</form>
