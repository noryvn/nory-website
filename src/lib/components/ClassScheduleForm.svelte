<script lang="ts">
	import { noryClient } from "$lib/nory";
	import { invalidateAll } from "$app/navigation";
	import { page } from "$app/stores";

	let error: Error | null = null;
	let success = false;
	let loading = false;

	let name = "";
	let startAt = "00:00";
	let day = -1;
	let duration = 0;

	$: disabled = !name || day < 0 || loading;

	async function createSchedule() {
		try {
			error = null;
			success = false;
			loading = true;

			await noryClient.createClassSchedule({
				classId: $page.params.classId,
				name,
				startAt: `2005-11-08T${startAt}:00Z`,
				day: parseInt(day),
				duration
			});
			await invalidateAll();

			name = "";
			startAt = "00:00";
			day = "-1";
			duration = 0;
		} catch (e) {
			error = e;
		} finally {
			loading = false;
		}
	}
</script>

<form class="form-control" on:submit|preventDefault={createSchedule}>
	<h2 class="text-3xl">Jadwal Baru:</h2>

	<label class="label" for="name-input"> Nama:* </label>
	<input id="name-input" type="text" name="name" class="input input-bordered" bind:value={name} />

	<label class="label" for="startAt-input"> Jam: </label>
	<input
		id="startAt-input"
		type="time"
		name="startAt"
		class="input input-bordered"
		bind:value={startAt}
	/>

	<label class="label" for="day-input"> Hari:* </label>
	<select id="day-input" bind:value={day} class="input input-bordered">
		<option value="-1" disabled> Hari </option>
		<option value="0"> Minggu </option>
		<option value="1"> Senin </option>
		<option value="2"> Selasa </option>
		<option value="3"> Rabu </option>
		<option value="4"> Kamis </option>
		<option value="5"> Jumat </option>
		<option value="6"> Sabtu </option>
	</select>

	<label class="label" for="duration-input"> Durasi(menit): </label>
	<input
		id="duration-input"
		type="number"
		name="duration"
		class="input input-bordered"
		bind:value={duration}
	/>

	<div class="p-1">*: Wajib</div>
	<button type="submit" class="btn btn-primary" class:loading {disabled}> Buat </button>

	<div class="py-4">
		{#if success}
			<div class="alert alert-info">Berhasil menambahkan Jadwal</div>
		{/if}

		{#if error}
			<div class="alert alert-error">
				{error.message}
			</div>
		{/if}
	</div>
</form>
