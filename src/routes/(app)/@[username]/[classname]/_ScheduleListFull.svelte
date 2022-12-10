<script lang="ts">
	import type { ClassSchedule } from "$lib/nory";
	import { browser } from "$app/environment";
	import { onMount } from "svelte";

	export let schedules = [] as ClassSchedule[];
	export let date = new Date();
	$: schedulesByDay = getSchedulesByDay(schedules);

	function getSchedulesByDay(schedules: ClassSchedule[]) {
		const byDay = Array.from({ length: 7 }, () => []);
		const ss = schedules.slice().sort((a, b) => a.startAt.localeCompare(b.startAt));
		for (const s of ss) {
			const day = byDay[s.day];
			day.push(s);
		}
		return byDay;
	}

	function isCurrentSchedule(schedule: ClassSchedule) {
		if (!browser) {
			return false;
		}
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

	let displayedDay = new Date().getDay();
	$: if (schedulesByDay) {
		addDisplayedDay(7);
	}
	function addDisplayedDay(n: number) {
		displayedDay += (n % 7) + 7;
		displayedDay %= 7;
		let retry = 0;
		while (schedulesByDay && !schedulesByDay[displayedDay].length && retry++ < 7) {
			displayedDay += n > 0 ? 1 : 6;
			displayedDay %= 7;
		}
	}
</script>

<div class="card bg-info text-info-content card-compact">
	<div class="card-body">
		<div class="w-full flex flex-row justify-between">
			<button class="btn btn-primary" on:click={() => addDisplayedDay(-1)}> Prev </button>
			<h2 class="card-title">
				{new Date(2005, 8, displayedDay + 4).toLocaleDateString(undefined, { weekday: "long" })}
			</h2>
			<button class="btn btn-primary" on:click={() => addDisplayedDay(1)}> Next </button>
		</div>
		<div class="text-lg">
			{#each schedulesByDay[displayedDay] as s (s.scheduleId)}
				{@const current = isCurrentSchedule(s)}
				<div class="{current && 'bg-zinc-700/30'} flex flex-row">
					<div class="grow truncate">
						<span> {s.name} </span>
						{#if current}
							<span> (Saat ini) </span>
						{/if}
					</div>
					<div class="min-w-max">
						<span> {s.startAt.slice(11, -4)} </span>
						<span> ({s.duration} menit) </span>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
