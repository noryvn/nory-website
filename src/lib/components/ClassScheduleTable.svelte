<script lang="ts">
	import type { ClassSchedule } from "$lib/nory"
	import { invalidateAll } from "$app/navigation"
	import { noryClient } from "$lib/nory"
	import { page } from "$app/stores"
	import Icon from "@iconify/svelte"

	export let schedule: ClassSchedule[]

	const days = ["minggu", "senin", "selasa", "rabu", "kamis", "juma`at", "sabtu"]

	let field = "day"
	let asc = true

	$: s = Array
		.from(schedule)
		.sort(sorter("startAt", true))
		.sort(sorter("day", true))
		.sort(sorter(field, asc))

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

	let deleteCandidate = ""
	let loading = false
	let error: Error | null = null

	function deleteSchedule(id: string) {
		return async () => {
			if (deleteCandidate !== id) {
				deleteCandidate = id
				return
			}

			try {
				loading = true
				error = null

				await noryClient.deleteClassSchedule($page.params.classId, deleteCandidate)
				await invalidateAll()

				deleteCandidate = ""
			} catch (e) {
				error = e
			} finally {
				loading = false
			}
		}
	}
</script>

<div class="overflow-x-auto -mx-4">
	<div class="py-4">
		{#if error}
			<div class="alert alert-error">
				{error.message}
			</div>
		{/if}
	</div>
	<table class="table w-full">
		<thead>
			<tr>
				<th> 
					<div class="flex flex-row gap-2">
						<button on:click={() => sorterSwitch("day")}>
							Hari 
						</button>
						{#if field === "day"}
							{#if asc}
								<Icon icon="ph:arrow-down" />
							{:else}
								<Icon icon="ph:arrow-up" />
							{/if}
						{/if}
					</div>
				</th>
				<th> 
					<div class="flex flex-row gap-2">
						<button on:click={() => sorterSwitch("name")}>
							Nama 
						</button>
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
					<div class="flex flex-row gap-2">
						<button on:click={() => sorterSwitch("startAt")}>
							Jam 
						</button>
						{#if field === "startAt"}
							{#if asc}
								<Icon icon="ph:arrow-down" />
							{:else}
								<Icon icon="ph:arrow-up" />
							{/if}
						{/if}
					</div>
				</th>
				<th> 
					<div class="flex flex-row gap-2">
						<button on:click={() => sorterSwitch("duration")}>
							Durasi(menit) 
						</button>
						{#if field === "duration"}
							{#if asc}
								<Icon icon="ph:arrow-down" />
							{:else}
								<Icon icon="ph:arrow-up" />
							{/if}
						{/if}
					</div>
				</th>
				<th> Aksi </th>
			</tr>
		</thead>
		<tbody>
			{#each s as schedule, i (schedule.scheduleId)}
				{@const startAt = new Date(schedule.startAt.slice(0, -1))}
				<tr>
					<th> {days[schedule.day]} </th>
					<th> {schedule.name} </th>
					<th> 
						{
							startAt.getHours().toString().padStart(2, "0")
						}:{
							startAt.getMinutes().toString().padStart(2, "0")
						}
					</th>
					<th> {schedule.duration || "-"} Menit </th>
					<th>
						<div class="flex flex-row">
							<button 
								type="button" 
								class="btn btn-warning btn-sm"
								class:loading={loading && deleteCandidate === schedule.scheduleId} 
								on:click={deleteSchedule(schedule.scheduleId)}
								disabled={loading}
							> 
								{ deleteCandidate === schedule.scheduleId ? "Yakin?" : "Hapus" }
							</button>
						</div>
					</th>
				</tr>
			{/each}
		</tbody>
	</table>
</div>