<script lang="ts">
	import { invalidateAll } from "$app/navigation";
	import { page } from "$app/stores";
	import type { ClassTask } from "$lib/nory";
	import { noryClient } from "$lib/nory";
	import Icon from "@iconify/svelte";
	import LoginGuard from "$lib/components/LoginGuard.svelte"

	export let tasks: ClassTask[] = [];
	let asc = false;
	let field = "name";

	$: t = Array.from(tasks)
		.sort((a, b) => a.dueDate - b.dueDate)
		.sort(sorter(field, asc));

	function sorter(field: string, asc: boolean) {
		return (a: ClassTask, b: ClassTask) => {
			let greater = a[field] > b[field];
			if (typeof a[field] === "string") {
				greater = a[field].localeCompare(b[field]) !== -1;
			}
			if (!asc) {
				greater = !greater;
			}
			return greater ? 1 : -1;
		};
	}

	function sorterSwitch(f: string) {
		if (field === f) {
			return (asc = !asc);
		}
		asc = true;
		field = f;
	}

	const fieldText = {
		dueDate: "tenggat",
		description: "deskripsi",
		name: "nama"
	};

	let loading = false;
	let error: Error | null = null;
	let prepDelete = "";
	let success = false;
	function deleteTask(taskId: string) {
		return async () => {
			if (prepDelete !== taskId) {
				prepDelete = taskId;
				return;
			}
			try {
				loading = true;
				success = false;
				error = null;

				await noryClient.deleteClassTask($page.params.classId, taskId);
				await invalidateAll();

				success = true;
			} catch (e) {
				error = e;
			} finally {
				loading = false;
			}
		};
	}
</script>

<div class={$$props.class}>
	<span class="p-4 w-full">
		Di Urutkan berdasarkan {fieldText[field]} secara {asc ? "ascending" : "descending"}
	</span>
	<div class="p-4">
		{#if success}
			<div class="alert alert-info">Berhasil menghapus tugas</div>
		{/if}
		{#if error}
			<div class="alert alert-error">
				{error.message}
			</div>
		{/if}
	</div>
	<div class="overflow-x-auto">
		<table class="table table-zebra w-full table-compact">
			<thead>
				<tr>
					<th>
						<div class="flex flex-row gap-2 items-center">
							<button on:click={() => sorterSwitch("name")}> Nama </button>
							{#if field === "name"}
								{#if asc}
									<Icon icon="ph:arrow-down" />
								{:else}
									<Icon icon="ph:arrow-up" />
								{/if}
							{/if}
						</div>
					</th>
					<th>
						<div class="flex flex-row gap-2 items-center">
							<button on:click={() => sorterSwitch("dueDate")}> Tenggat </button>
							{#if field === "dueDate"}
								{#if asc}
									<Icon icon="ph:arrow-down" />
								{:else}
									<Icon icon="ph:arrow-up" />
								{/if}
							{/if}
						</div>
					</th>
					<th>
						<div class="flex flex-row gap-2 items-center">
							<button on:click={() => sorterSwitch("description")}> Deskripsi </button>
							{#if field === "description"}
								{#if asc}
									<Icon icon="ph:arrow-down" />
								{:else}
									<Icon icon="ph:arrow-up" />
								{/if}
							{/if}
						</div>
					</th>
					<th>
						<div class="flex flex-row gap-2 items-center">
							<button on:click={() => sorterSwitch("authorDisplayName")}> Pembuat </button>
							{#if field === "authorDisplayName"}
								{#if asc}
									<Icon icon="ph:arrow-down" />
								{:else}
									<Icon icon="ph:arrow-up" />
								{/if}
							{/if}
						</div>
					</th>
					<th>
						<div class="flex flex-row gap-2 items-center">
							<button on:click={() => sorterSwitch("authorId")}> Id Pembuat </button>
							{#if field === "authorId"}
								{#if asc}
									<Icon icon="ph:arrow-down" />
								{:else}
									<Icon icon="ph:arrow-up" />
								{/if}
							{/if}
						</div>
					</th>
					<LoginGuard>
						<th>
							<span> Aksi </span>
						</th>
					</LoginGuard>
				</tr>
			</thead>
			<tbody>
				{#each t as task (task.taskId)}
					<tr>
						<th> {task.name} </th>
						<th> {new Date(task.dueDate).toLocaleDateString("en-GB")} </th>
						<th class="break-all whitespace-pre">
							{task.description}
							<div class="w-36" />
						</th>
						<th> {task.authorDisplayName} </th>
						<th> {task.authorId} </th>
						<LoginGuard>
							<th>
								<div class="flex flex-row w-full">
									<button
										class="btn btn-sm btn-warning"
										class:loading={loading && task.taskId === prepDelete}
										disabled={loading}
										on:click={deleteTask(task.taskId)}
									>
										{prepDelete === task.taskId ? "Yakin?" : "Hapus"}
									</button>
								</div>
							</th>
						</LoginGuard>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
