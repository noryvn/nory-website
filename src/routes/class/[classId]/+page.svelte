<script lang="ts">
	import type { ClassTask } from "$lib/nory";
	import { noryClient } from "$lib/nory";
	import { page } from "$app/stores";
	import { invalidateAll } from "$app/navigation";

	import CreateTaskForm from "$lib/components/CreateTaskForm.svelte";
	import ClassTaskTable from "$lib/components/ClassTaskTable.svelte";

	let selected = "task";
</script>

<main class="flex-auto">

	<div class="p-4">
		<h1 class="text-5xl capitalize"> {$page.data.info.name} </h1>
		<p> {$page.data.info.description} </p>
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
			<span class="mt-4 text-xl"> Tugas Baru </span>
			<CreateTaskForm />
			<span class="mt-4 text-xl"> Daftar Tugas </span>
			<ClassTaskTable tasks={$page.data.task} class="-mx-4"/>
		</div>
	{:else if selected === "member-"}
		<div class="overflow-x-auto">
			<table class="table table-zebra w-full">
				<thead>
					<tr>
						<th />
						<th>Name</th>
						<th />
						<th />
					</tr>
				</thead>
			</table>
		</div>
	{/if}
</main>
