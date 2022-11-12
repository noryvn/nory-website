<script lang="ts">
	import type { ClassSchedule } from "$lib/nory"

	export let schedules = [] as ClassSchedule[]

	$: schedulesByDay = getSchedulesByDay(schedules)

	function getSchedulesByDay(schedules: ClassSchedule[]) {
		const byDay = Array.from({ length: 7 }, () => [])
		for (const s of schedules) {
			if (byDay[s.day].find(i => i.name === s.name)) {
				continue
			}
			byDay[s.day].push(s)
		}
		return byDay
	}

</script>

<div class="grid grid-cols-2 gap-2 max-w-md xl:max-w-lg mx-auto w-full">
	{#each schedulesByDay as currentSchedules, i}
		{#if currentSchedules.length}
			<div 
				class="card card-compact bg-base-300 text-base-content min-h-[12rem]"
			>
				<div class="card-body">
					<h3 class="text-xl"> {new Date(2005, 11, i + 4).toLocaleString(undefined, { weekday: "long" })} </h3>
					<div class="overflow-x-auto h-full">
						{#each currentSchedules as s, i}
							<div class="flex flex-row relative text-lg">
								<span> {s.name} </span>
								<span class="grow"></span>
								<span class="sticky right-0 bg-base-300 pl-2"> {s.startAt.slice(11, -4)} </span>
							</div>
						{/each}
					</div>
				</div>
			</div>
		{/if}
	{/each}
</div>
