<script lang="ts">
	import type { ClassSchedule } from "$lib/nory";
	import ScheduleListSimple from "./_ScheduleListSimple.svelte";
	import ScheduleListFull from "./_ScheduleListFull.svelte";

	export let schedules = [] as ClassSchedule[];
	export let simple = true;
</script>

{#if simple}
	<ScheduleListSimple {schedules} />
{:else}
	<ScheduleListFull {schedules} />
{/if}
