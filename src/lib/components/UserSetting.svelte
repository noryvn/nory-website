<script lang="ts">
	import { REGEX } from "$lib/constant";
	import { noryClient, user } from "$lib/nory";
	import { invalidateAll } from "$app/navigation";
	export let username = "";
	export let name = "";
	let loading = false;
	let success = false;
	let error: Error | null = null;
	$: invalidUsername =
		!REGEX.USERNAME.test(username) && username !== "" && username !== $user.username;
	$: invalidName = name.length > 32;
	$: disabled = loading || invalidUsername || invalidName;

	async function updateProfile() {
		try {
			loading = true;
			error = null;
			success = false;
			await noryClient.updateProfile({ username, name });
			await invalidateAll();
			username = "";
			name = "";
			success = true;
		} catch (e) {
			error = e;
		} finally {
			loading = false;
		}
	}
</script>

<div>
	<form on:submit|preventDefault={updateProfile} class="form-control">
		<label class="label"> Username </label>
		<input
			placeholder="username"
			type="text"
			name="username"
			class="input input-bordered"
			bind:value={username}
		/>
		{#if invalidUsername}
			<div class="text-error">
				<div class="flex flex-col">
					<span> Username harus diawali angka atau huruf </span>
					<span> Username harus diawali angka atau huruf </span>
					<span> Username tidak boleh lebih dari 20 karakter </span>
				</div>
			</div>
		{/if}

		<label class="label"> Nama </label>
		<div class="input-group">
			<input
				placeholder="Nama mu"
				type="text"
				name="name"
				class="input input-bordered grow"
				bind:value={name}
			/>
			<button type="button" class="btn btn-warning" on:click={() => (name = "")}> clear </button>
		</div>
		{#if invalidName}
			<span class="text-error"> Nama tidak valid </span>
		{/if}

		<button {disabled} class:loading class="btn btn-primary my-4" type="submit"> Edit </button>
	</form>
	{#if success}
		<div class="alert alert-info">Berhasil mengubah data diri</div>
	{/if}
	{#if error}
		<div class="alert alert-error">{error.message}</div>
	{/if}
</div>
