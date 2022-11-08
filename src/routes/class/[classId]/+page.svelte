<script lang="ts">
	import type { ClassTask } from "$lib/nory";
	import { noryClient } from "$lib/nory";
	import { page } from "$app/stores";
	import { invalidateAll } from "$app/navigation";

	import CreateTaskForm from "$lib/components/CreateTaskForm.svelte";
	import ClassTaskTable from "$lib/components/ClassTaskTable.svelte";
	import ClassMemberList from "$lib/components/ClassMemberList.svelte";
	import AddClassMemberForm from "$lib/components/AddClassMemberForm.svelte";
	import LoginGuard from "$lib/components/LoginGuard.svelte";

	let selected = "task";
</script>

<main class="flex-auto">
	<div class="p-4">
		<h1 class="text-5xl capitalize">{$page.data.info.name}</h1>
		<p>{$page.data.info.description}</p>
	</div>

	<div class="tabs">
		<btn
			on:click={() => (selected = "task")}
			class="tab tab-bordered"
			class:tab-active={selected === "task"}
		>
			Tugas
		</btn>
		<btn
			on:click={() => (selected = "member")}
			class="tab tab-bordered"
			class:tab-active={selected === "member"}
		>
			Anggota
		</btn>
	</div>

	{#if selected === "task"}
		<div class="px-4 flex flex-col">
			<LoginGuard>
				<h2 class="mt-4 text-3xl">Tugas Baru</h2>
				<CreateTaskForm />
			</LoginGuard>
			<div class="divider" />
			<h2 class="mt-4 text-3xl">Daftar Tugas</h2>
			<ClassTaskTable tasks={$page.data.task} class="-mx-4" />
		</div>
	{:else if selected === "member"}
		<div class="px-4 flex flex-col">
			<LoginGuard>
				<AddClassMemberForm />
			</LoginGuard>
			<ClassMemberList members={$page.data.member} class="-mx-4" />
		</div>
	{/if}
</main>
