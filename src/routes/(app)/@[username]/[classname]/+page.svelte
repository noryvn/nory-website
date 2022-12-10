<script lang="ts">
	import { page } from "$app/stores";
	import Icon from "@iconify/svelte";
	import AppBottomNavbar from "$lib/components/AppBottomNavbar.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import SchedulePage from "./_SchedulePage.svelte";
	import TaskPage from "./_TaskPage.svelte";

	let selected;
	const texts = {
		schedule: "Jadwal",
		task: "Tugas"
	};
	$: classInfo = $page.data.classInfo;
	$: schedulesName = [...new Set($page.data.schedules?.map((i) => i.name))];
</script>

<svelte:head>
	<title>{classInfo.name} class home page.</title>
</svelte:head>

<nav class="navbar bg-base-100 border-base-content border-b">
	<div class="flex-1 text-2xl space-x-2">
		<a href="/@{$page.data.user.username}"> @{$page.data.user.username} </a>
	</div>
</nav>

<div class="p-4 flex flex-col space-y-4 grow">
	{#if selected === "schedule"}
		<SchedulePage schedules={$page.data.schedules} name={classInfo.name} />
	{/if}
	{#if selected === "task"}
		<TaskPage {schedulesName} name={classInfo.name} classId={classInfo.classId} />
	{/if}

	<AppBottomNavbar classId={classInfo.classId} bind:selected />
</div>

<Footer />
<div class="h-16" />
