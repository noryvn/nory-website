<script lang="ts">
	import type { ClassSchedule } from "$lib/nory"

	export let schedules = [] as ClassSchedule[]
	export let date = new Date()

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

	function fillSchedules(schedules: ClassSchedule[]): (ClassSchedule | null)[] {
		return Array.from({ length: 5 }).map((_, i) => schedules[i] || null).concat(schedules.slice(5))
	}
</script>

<div class="grid grid-cols-2 gap-4 w-full">
	{#each schedulesByDay as currentSchedules, i}
		{@const current = date.getDay() === i}
		{@const tommorow = date.getDay() + 1 === i}
		<div 
			class="card card-compact bg-info text-info-content min-h-[12rem] "
		>
			<div class="card-body">
				<div class="justify-between flex-row flex"> 
					<h3 class="card-title">
						
						{new Date(2005, 11, i + 4).toLocaleString(undefined, { weekday: "long" })}
					</h3>
						
					{#if current || tommorow}
						<span class="badge">
							{#if current} Hari Ini {/if}
							{#if tommorow} Besok {/if}
						</span>
					{/if}
				</div>
				<div class="overflow-x-auto h-full divide-y divide-info-content">
					{#each fillSchedules(currentSchedules) as s, i}
							<div class="flex flex-row text-lg">
						{#if s}
								<span class="whitespace-pre truncate"> {s.name.repeat(20)} </span>
								<div class="grow"></div>
								<span> {s.startAt.slice(11, -4)} </span>
						{:else}
							-
						{/if}
							</div>
					{/each}
					<div></div>
				</div>
			</div>
		</div>
	{/each}
</div>
