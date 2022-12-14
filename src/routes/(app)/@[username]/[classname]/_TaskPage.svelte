<script lang="ts">
	import type { ClassTask } from "$lib/nory";
	import { noryClient } from "$lib/nory";
	import { onMount } from "svelte";
	import { browser } from "$app/environment";
	import ScheduleCurrentCard from "./_ScheduleCurrentCard.svelte";
	import ScheduleList from "./_ScheduleList.svelte";
	import Icon from "@iconify/svelte";

	export let schedulesName = [] as string[];
	export let name;
	export let classId;
	export let currentDate = new Date().toISOString().slice(0, 10);
	function addDay(date: string, day: number) {
		return new Date(new Date(date).getTime() + day * 86400_000).toISOString().slice(0, 10);
	}

	let cachedTasks: Record<string, ClassTask[]> = {};
	async function getTasks(date: string) {
		cachedTasks[date] ??= [];
		const from = new Date(currentDate);

		const { data } = await noryClient.getClassTaskAt(classId, from);
		cachedTasks[date] = data;
		if (cachedTasks[date].length === 0) {
			cachedTasks[date] = null;
		}
	}
	$: getTasks(currentDate);

	let unfinishedOnly = false;
	function filterTasks(unfinishedOnly: boolean) {
		return (t: ClassTask) => {
			if (!unfinishedOnly) {
				return true;
			}
			if (!finished.includes(t.taskId)) {
				return true;
			}
			return false;
		};
	}

	let finished = [];
	let loaded = false;
	let hint = false;
	function loadFinished() {
		if (!browser) {
			return;
		}
		try {
			const f = localStorage.getItem("finish") || "[]";
			loaded = true;
			finished = JSON.parse(f);
		} catch {}
	}
	function saveFinished(finished: string[]) {
		if (!browser) {
			return;
		}
		localStorage.setItem("finish", JSON.stringify(finished));
	}
	$: loaded && saveFinished(finished);
	$: loaded && localStorage.setItem("task:unfinishedOnly", unfinishedOnly.toString());

	onMount(() => {
		hint = localStorage.getItem("hint-task") !== new Date().toISOString().slice(0, 10);
		unfinishedOnly = localStorage.getItem("task:unfinishedOnly") === "true";
		loadFinished();
	});
</script>

<div class="max-w-md container mx-auto space-y-4 h-full">
	<div class="px-4 py-2 w-full text-center bg-info text-info-content rounded-lg shadow">
		<h2 class="text-3xl">
			Tugas Kelas {name}
		</h2>
	</div>
	<div class="flex flex-col p-4 border border-neutral rounded-md shadow h-full">
		<div class="flex flex-row flex-wrap justify-between gap-2">
			<button on:click={() => (currentDate = addDay(currentDate, -1))} class="btn btn-primary">
				Prev
			</button>
			<input type="date" name="date" class="input input-bordered grow" bind:value={currentDate} />
			<button on:click={() => (currentDate = addDay(currentDate, 1))} class="btn btn-primary">
				Next
			</button>
			<div class="w-full flex flex-col">
				<label class="label cursor-pointer w-max space-x-2">
					<input type="checkbox" name="" class="checkbox" bind:checked={unfinishedOnly} />
					<span class="label-text"> Hanya yang belum </span>
				</label>
			</div>
		</div>

		<div class="divider">
			{new Date(currentDate).toLocaleString(undefined, { weekday: "long" })}
		</div>

		<div class="flex flex-col space-y-4">
			{#if cachedTasks[currentDate]}
				{#each cachedTasks[currentDate].filter(filterTasks(unfinishedOnly)) as task (task.taskId)}
					<div class="card card-compact bg-info text-info-content">
						<div class="card-body">
							<div class="flex flex-row items-center justify-between">
								<h2 class="card-title">{task.name}</h2>
								{#if finished.includes(task.taskId)}
									<button
										class="badge badge-outline"
										on:click={() => (finished = finished.filter((i) => i !== task.taskId))}
									>
										<Icon icon="mdi:close" />
										Diselesaikan
									</button>
								{/if}
							</div>
							<p>{task.description}</p>

							{#if !finished.includes(task.taskId)}
								<button
									class="btn btn-sm btn-outline text-neutral"
									on:click={() => (finished = finished.concat([task.taskId]))}
								>
									Selesai
								</button>
							{/if}
						</div>
					</div>
				{/each}
				{#if cachedTasks[currentDate].length}
					<div>Semangat teman teman</div>
				{/if}
			{:else if hint}
				<div class="alert alert-info">
					Hai kak, Setiap Anggota kelas dapat mengisi daftar tugas disini.
					<button
						class="btn"
						on:click={() => {
							hint = false;
							localStorage.setItem("hint-task", new Date().toISOString().slice(0, 10));
						}}
					>
						ok
					</button>
				</div>
			{:else}
				<div class="text-center">Kosong</div>
			{/if}
		</div>
	</div>
</div>
