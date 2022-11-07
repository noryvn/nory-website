<script lang="ts">
	import type { ClassTask } from "$lib/nory";
	import { noryClient } from "$lib/nory";
	import { page } from "$app/stores";
	import { invalidateAll } from "$app/navigation";

	const currentDate = new Date().toISOString().slice(0, 10);

	let loading = false;
	let error: Error | null = null;
	let message = "";
	let name = "";
	let description = "";
	let authorDisplayName = "";
	let dueDate = "2005-08-11";
	$: disabled = loading || name === "" || description === "";

	async function createTask() {
		try {
			error = null;
			message = "";
			loading = true;
			if (dueDate === "2005-08-11") {
				throw new Error("Hei, ini tanggal apa?");
			}

			await noryClient.createClassTask({
				name,
				description,
				authorDisplayName,
				dueDate: new Date(dueDate),
				classId: $page.params.classId
			});
			await invalidateAll();

			error = null;
			name = "";
			description = "";
			dueDate = currentDate;
			message = "Berhasil menambahkan tugas";
		} catch (e) {
			error = e;
		} finally {
			loading = false;
		}
	}
</script>

<form class="form-control max-w-md mx-auto w-full" on:submit|preventDefault={createTask}>
	<label for="task-name-input" class="label">
		<span class="label-text"> Nama </span>
	</label>
	<input
		id="task-name-input"
		type="text"
		name="name"
		class="input input-bordered grow"
		bind:value={name}
	/>

	<label for="task-name-input" class="label">
		<span class="label-text"> Nama Pembuat </span>
	</label>
	<div class="input-group">
		<input
			id="task-name-input"
			type="text"
			name="author-display-name"
			class="input input-bordered grow"
			bind:value={authorDisplayName}
		/>
		<button
			type="button"
			class="btn btn-warning"
			on:click={() => authorDisplayName = ""}
		>
			hapus
		</button>
	</div>

	<label for="task-dueDate-input" class="label">
		<span class="label-text"> Tenggat </span>
	</label>
	<div class="input-group">
		<input
			id="task-dueDate-input"
			type="date"
			name="dueDate"
			class="input input-bordered grow"
			bind:value={dueDate}
		/>
		<button type="button" class="btn btn-primary" on:click={() => (dueDate = currentDate)}>
			reset
		</button>
	</div>

	<label for="task-description-input" class="label">
		<span class="label-text"> Deskripsi </span>
	</label>
	<textarea
		id="task-description-input"
		class="textarea textarea-bordered h-48"
		name="description"
		bind:value={description}
	/>

	{#if error}
		<div class="alert alert-error mt-2">
			{error.message}
		</div>
	{/if}

	{#if message}
		<div class="alert alert-info mt-2">
			{message}
		</div>
	{/if}

	<button type="submit" class="btn btn-primary mt-4" class:loading {disabled}> Buat </button>
</form>
