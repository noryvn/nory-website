<script lang="ts">
	import { page } from "$app/stores";
	import Icon from "@iconify/svelte";
	import AppBottomNavbar from "$lib/components/AppBottomNavbar.svelte";
	import SchedulePage from "./_SchedulePage.svelte";

	let selected;
	const texts = {
		schedule: "Jadwal"
	};
	$: classInfo = $page.data.classInfo;
</script>

<div class="p-4 flex flex-col space-y-4">
	{#if selected === "schedule"}
		<SchedulePage schedules={$page.data.schedules} name={classInfo.name} />
	{/if}

	<AppBottomNavbar classId={classInfo.classId} bind:selected />
</div>

<div class="h-20" />
