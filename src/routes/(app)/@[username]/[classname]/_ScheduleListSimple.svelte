<script lang="ts">
	import type { ClassSchedule } from "$lib/nory";
	import { browser } from "$app/environment";

	export let schedules = [] as ClassSchedule[];
	export let date = new Date();
	$: schedulesByDay = getSchedulesByDay(schedules);

	function getSchedulesByDay(schedules: ClassSchedule[]) {
		const byDay = Array.from({ length: 7 }, () => []);
		const ss = schedules.slice().sort((a, b) => a.startAt.localeCompare(b.startAt));
		for (const s of ss) {
			const day = byDay[s.day];
			// if (day[day.length - 1]?.name === s.name) {
			// 	day.duration += s.duration
			// 	continue
			// }
			if (day.find((i) => i.name === s.name)) {
				continue;
			}
			day.push(s);
		}
		return byDay;
	}

	function fillSchedules(schedules: ClassSchedule[]): (ClassSchedule | null)[] {
		return Array.from({ length: 5 })
			.map((_, i) => schedules[i] || null)
			.concat(schedules.slice(5));
	}

	function isCurrentSchedule(schedule: ClassSchedule) {
		if (schedule.day !== date.getDay()) {
			return false;
		}

		const startAt = new Date(date.toISOString().slice(0, 10) + schedule.startAt.slice(10, -1));
		// not started
		if (startAt >= date) {
			return false;
		}

		const until = addMinutes(startAt, schedule.duration);
		// expiry
		if (until < date) {
			return false;
		}

		return true;
	}

	function addMinutes(date: Date, minutes: number) {
		return new Date(date.getTime() + minutes * 60_000);
	}
</script>

<div class="grid grid-cols-2 gap-4 w-full">
	{#each schedulesByDay as _, ii}
		{@const i = (ii + 1) % 7}
		{@const current = date.getDay() === i}
		{@const tommorow = (date.getDay() + 1) % 7 === i}
		<div class="card card-compact bg-info text-info-content min-h-[12rem] ">
			<div class="card-body">
				<div class="justify-between flex-row flex">
					<h3 class="card-title">
						{new Date(2005, 8, i + 4).toLocaleString(undefined, { weekday: "long" })}
					</h3>

					{#if current && browser}
						<span class="text-md badge"> Hari Ini </span>
					{/if}

					{#if tommorow && browser}
						<span class="text-md badge badge-outline"> Besok </span>
					{/if}
				</div>
				<div class="overflow-x-auto h-full divide-y divide-info-content">
					{#each fillSchedules(schedulesByDay[i]) as s, i}
						<div class="flex flex-row text-lg items-center">
							{#if s}
								<span class="whitespace-pre truncate"> {s.name}</span>
								<div class="grow" />
								<!-- {#if isCurrentSchedule(s)}
									<span class="badge badge-success"> Sekarang </span>
								{:else}
									<span class="badge badge-outline"> {s.startAt.slice(11, -4)} </span>
								{/if} -->
							{:else}
								<span class="invisible"> abel </span>
							{/if}
						</div>
					{/each}
					<div />
				</div>
			</div>
		</div>
	{/each}
</div>
