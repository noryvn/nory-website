<script lang="ts">
	import type { ClassSchedule } from "$lib/nory"
	import { onMount } from "svelte"

	export let schedules = [] as ClassSchedule[]
	export let date = new Date()

	$: current = getCurrent(date)

	function getCurrent(date: Date) {
		for (const s of schedules) {
			// missmatch day
			if (s.day !== date.getDay()) {
				continue
			}

			const startAt = new Date(date.toISOString().slice(0, 10) + s.startAt.slice(10, -1))
			// not started
			if (startAt >= date) {
				continue
			}

			const until = addMinutes(startAt, s.duration)
			// expiry
			if (until < date) {
				continue
			}

			return s
		}
	}

	function addMinutes(date: Date, minutes: number) {
		return new Date(date.getTime() + minutes * 60_000)
	}

	onMount(() => {
		setInterval(() => date = new Date(date.getTime() + 1000), 1000)
	})
</script>

<div class="card card-compact bg-neutral text-neutral-content">
	
<div class="w-full card-body">
	<h3 class="text-2xl"> Sekarang </h3>
	{#if current}
		{@const startAt = new Date(current.startAt.slice(0, -1))}
		{@const until = addMinutes(startAt, current.duration)}

		<span> Pelajaran: {current.name} </span>
		<span> Mulai: {startAt.toLocaleTimeString()} </span>
		<span> Hingga: {until.toLocaleTimeString()} </span>
	{/if}
</div>
</div>
