<script lang="ts">
	import { page } from "$app/stores"
	import Icon from "@iconify/svelte"
	import AppBottomNavbar from "$lib/components/AppBottomNavbar.svelte"
	import SchedulePage from "./_SchedulePage.svelte"

	let selected
	const texts = {
		"schedule": "Jadwal",
	}
	$: classInfo = $page.data.classInfo
</script>

<div class="p-4 flex flex-col space-y-4">
	<div>
		<h1 class="text-5xl"> {classInfo.name} </h1>
		<p> {classInfo.description} </p>
	</div>

	<h2 class="text-3xl mx-auto">
		{texts[selected]}
	</h2>
	{#if selected === "schedule"}
		<SchedulePage schedules={$page.data.schedules} />
	{/if}

	<AppBottomNavbar classId={classInfo.classId} bind:selected />
</div>