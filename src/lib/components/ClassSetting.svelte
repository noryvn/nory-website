<script lang="ts">
	import type { Class } from "$lib/nory"
	import { noryClient } from "$lib/nory"
	import { goto } from "$app/navigation"
	import ClassUpdateForm from "$lib/components/ClassUpdateForm.svelte"

	export let classInfo: Class

	let confirmDelete = 0

	let loading = false
	let error: Error | null = null

	let deleting = false
	async function deleteClass() {
		if (confirmDelete < 3) {
			confirmDelete++
			return
		}

		try {
			deleting = true
			await noryClient.deleteClass(classInfo.classId)
			await goto("/user")
		} catch (e) {
			error = e
		} finally {
			deleting = false
		}
	}
</script>

<div class="flex flex-col">
	<ClassUpdateForm {classInfo} />
	<div class="p-4"></div>
	<div class="divider"> Danger Zone </div>
	<button 
		class="btn btn-warning btn-block"
		class:loading={deleting}
		disabled={deleting}
		on:click={() => deleteClass()}
	> 
		{#if confirmDelete === 3}
			Menghapus
		{:else if confirmDelete}
			{4 - confirmDelete}
		{:else}
			Hapus Kelas 
		{/if}
	</button>
	{#if confirmDelete}
		<span class="text-error">
			Tekan 3 kali untuk menghapus kelas
		</span>
	{/if}

	{#if error}
		<div class="alert alert-error">
			{error.message}
		</div>
	{/if}
</div>