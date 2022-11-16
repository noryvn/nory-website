<script lang="ts">
	import type { ClassTask } from "$lib/nory";
	import { noryClient } from "$lib/nory";
	import { onMount } from "svelte";
	import ScheduleCurrentCard from "./_ScheduleCurrentCard.svelte";
	import ScheduleList from "./_ScheduleList.svelte";

	export let schedulesName = [] as string[];
	export let name;
	export let classId;
	export let currentDate = new Date().toISOString().slice(0, 10)
	function addDay(date: string, day: number) {
		return new Date(new Date(date).getTime() + day * 86400_000).toISOString().slice(0, 10)
	}

	let cachedTasks: Record<string, ClassTask[]> = {}
	async function getTasks(date: string) {
		cachedTasks[date] ??= []
		const from = new Date(currentDate)

		const { data } = await noryClient.getClassTaskAt(classId, from)
		cachedTasks[date]  = data
	}
	$: getTasks(currentDate)
</script>

<div class="max-w-md container mx-auto space-y-4 h-full">
	<div class="px-4 py-2 w-full text-center bg-info text-info-content rounded-lg shadow">
		<h2 class="text-3xl">
			Tugas Kelas {name}
		</h2>
	</div>
	<div class="flex flex-col p-4 border boreder-base-content rounded-md shadow h-full">
		<div class="flex flex-row justify-between gap-2">
			<button on:click={() => currentDate = addDay(currentDate, -1)} class="btn btn-primary"> Prev </button>
			<input type="date" name="date" class="input input-bordered grow" bind:value={currentDate}>
			<button on:click={() => currentDate = addDay(currentDate, 1)} class="btn btn-primary"> Next </button>
		</div>

		<div class="divider">{new Date(currentDate).toLocaleString(undefined, { weekday: "long" })}</div>

		{#each cachedTasks[currentDate] as task (task.taskId)}
			<div class="card card-compact bg-info">
				<div class="card-body">
					<h2 class="card-title">{task.name}</h2>
					<p>{task.description}</p>
				</div>
			</div>
		{/each}
	</div>
</div>
