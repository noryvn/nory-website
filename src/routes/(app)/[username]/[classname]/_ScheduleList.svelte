<script lang="ts">
	import type { ClassSchedule } from "$lib/nory"
	import ScheduleListSimple from "./_ScheduleListSimple.svelte"

	export let schedules = [] as ClassSchedule[]
	export let simple = true
</script>

{#if simple}
	<ScheduleListSimple {schedules} />
{/if}
