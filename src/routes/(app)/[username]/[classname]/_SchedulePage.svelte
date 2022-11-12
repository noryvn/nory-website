<script lang="ts">
	import type { ClassSchedule } from "$lib/nory"
	import { noryClient } from "$lib/nory"
	import { onMount } from "svelte"
	import ScheduleCurrentCard from "./_ScheduleCurrentCard.svelte"
	import ScheduleList from "./_ScheduleList.svelte"

	export let classId
	export let schedules = [] as ClassSchedule[]
</script>

<ScheduleList {schedules} />
