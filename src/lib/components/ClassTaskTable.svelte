<script lang="ts">
	import type { ClassTask } from "$lib/nory";
	import Icon from "@iconify/svelte";

	export let tasks: ClassTask[] = [];
	let asc = false;
	let field = "name";

	$: t = Array.from(tasks).sort(sorter(field, asc));

	function sorter(field: string, asc: boolean) {
		return (a: ClassTask, b: ClassTask) => {
			let greater = a[field] > b[field];
			if (typeof a[field] === "string") {
				greater = a[field].localeCompare(b[field]) != -1;
			}
			if (asc) {
				greater = !greater;
			}
			return greater ? 1 : -1;
		};
	}

	function sorterSwitch(f: string) {
		if (field === f) {
			return (asc = !asc);
		}
		asc = false;
		field = f;
	}

	const fieldText = {
		dueDate: "tenggat",
		description: "deskripsi",
		name: "nama"
	};
</script>

<div class={$$props.class}>
	<span class="p-4 w-full">
		Di Urutkan berdasarkan {fieldText[field]} secara {asc ? "ascending" : "descending"}
	</span>
	<div class="overflow-x-auto">
		<table class="table table-zebra w-full table-compact">
			<thead>
				<tr>
					<th />
					<th>
						<div class="flex flex-row gap-2 items-center">
							<button on:click={() => sorterSwitch("name")}> Nama </button>
							{#if field === "name"}
								{#if asc}
									<Icon icon="ph:arrow-up" />
								{:else}
									<Icon icon="ph:arrow-down" />
								{/if}
							{/if}
						</div>
					</th>
					<th>
						<div class="flex flex-row gap-2 items-center">
							<button on:click={() => sorterSwitch("dueDate")}> Tenggat </button>
							{#if field === "dueDate"}
								{#if asc}
									<Icon icon="ph:arrow-up" />
								{:else}
									<Icon icon="ph:arrow-down" />
								{/if}
							{/if}
						</div>
					</th>
					<th>
						<div class="flex flex-row gap-2 items-center">
							<button on:click={() => sorterSwitch("description")}> Deskripsi </button>
							{#if field === "description"}
								{#if asc}
									<Icon icon="ph:arrow-up" />
								{:else}
									<Icon icon="ph:arrow-down" />
								{/if}
							{/if}
						</div>
					</th>
				</tr>
			</thead>
			<tbody>
				{#each t as task, i (task.taskId)}
					<tr>
						<th> {i + 1}. </th>
						<th> {task.name} </th>
						<th class="w-max"> {new Date(task.dueDate).toLocaleDateString("en-GB")} </th>
						<th class="break-all whitespace-pre">
							{task.description}
						</th>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
