<script lang="ts">
	import type { ClassMember } from "$lib/nory"
	import { noryClient } from "$lib/nory"
	import { REGEX } from "$lib/constant"
	import { page } from "$app/stores"
	import { invalidateAll } from "$app/navigation"

	let username: string
	let loading = false
	let error: Error | null = null
	let success = false
	$: invalidUsername = !REGEX.USERNAME.test(username)
	$: disabled = loading || invalidUsername || !username
	async function addClassMember() {
		try {
			loading = true
			success = false
			error = null
			await noryClient.addClassMember($page.params.classId, username)
			await invalidateAll()
			success = true
		} catch (e) {
			error = e
		} finally {
			loading = false
		}
	}
</script>

<div class="p-4 max-w-md w-full mx-auto">
	<form 
		on:submit|preventDefault
		class="form-control"
	>
		<label class="input-group">
			<span> Username </span>
			<input type="text" name="username" class="input input-bordered grow" bind:value={username}>
			<button 
				on:click={addClassMember}
				class="btn btn-primary"
				class:loading 
				{disabled}
			> 
				Tambahkan 
			</button>
		</label>
		{#if success}
			<span> Berhasil menambahkan anggota </span>
		{/if}
		{#if username && invalidUsername}
			<span class="text-error"> Username tidak valid </span>
		{/if}
		{#if error}
			<span class="text-error"> {error.message} </span>
		{/if}
	</form>
</div>