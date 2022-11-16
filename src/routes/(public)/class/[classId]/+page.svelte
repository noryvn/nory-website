<script lang="ts">
	import type { ClassTask } from "$lib/nory";
	import { noryClient } from "$lib/nory";
	import { page } from "$app/stores";
	import { invalidateAll } from "$app/navigation";
	import { onMount } from "svelte"

	import CreateTaskForm from "$lib/components/CreateTaskForm.svelte";
	import ClassTaskTable from "$lib/components/ClassTaskTable.svelte";
	import ClassSetting from "$lib/components/ClassSetting.svelte";
	import ClassMemberList from "$lib/components/ClassMemberList.svelte";
	import ClassScheduleForm from "$lib/components/ClassScheduleForm.svelte";
	import ClassScheduleTable from "$lib/components/ClassScheduleTable.svelte";
	import AddClassMemberForm from "$lib/components/AddClassMemberForm.svelte";
	import LoginGuard from "$lib/components/LoginGuard.svelte";

	let selected = "task";

	$: tasks = $page.data.task;
	$: member = $page.data.member;
	$: info = $page.data.info;

	let classUrl = "/loading"

	onMount(async () => {
		const userId = member.find(i => i.level === "owner").userId
		if (!userId) {
			return
		}
		const { data: user } = await noryClient.getProfileById(userId)
		classUrl = new URL(`/@${user.username}/${info.name}`, $page.url).href
	})

</script>

<main class="flex-auto">
	<div class="p-4">
		<h1 class="text-5xl capitalize">{$page.data.info.name}</h1>
		<p>{$page.data.info.description}</p>
		<a href={classUrl} class="link link-primary"> {classUrl} </a>
	</div>

	<div class="tabs">
		<btn
			on:click={() => (selected = "task")}
			class="tab tab-bordered"
			class:tab-active={selected === "task"}
		>
			Tugas
		</btn>
		<btn
			on:click={() => (selected = "schedule")}
			class="tab tab-bordered"
			class:tab-active={selected === "schedule"}
		>
			Jadwal
		</btn>
		<btn
			on:click={() => (selected = "member")}
			class="tab tab-bordered"
			class:tab-active={selected === "member"}
		>
			Anggota
		</btn>
		<LoginGuard>
			<btn
				on:click={() => (selected = "setting")}
				class="tab tab-bordered"
				class:tab-active={selected === "setting"}
			>
				Pengaturan
			</btn>
		</LoginGuard>
	</div>

	{#if selected === "task"}
		<div class="px-4 flex flex-col">
			<LoginGuard>
				<h2 class="mt-4 text-3xl">Tugas Baru</h2>
				<CreateTaskForm />
			</LoginGuard>
			<div class="divider" />
			<h2 class="mt-4 text-3xl">Daftar Tugas</h2>
			<ClassTaskTable tasks={$page.data.task} class="-mx-4" />
		</div>
	{:else if selected === "member"}
		<div class="px-4 flex flex-col">
			<LoginGuard>
				<AddClassMemberForm />
			</LoginGuard>
			<ClassMemberList members={$page.data.member} class="-mx-4" />
		</div>
	{:else if selected === "schedule"}
		<div class="p-4 flex flex-col">
			<LoginGuard>
				<ClassScheduleForm />
			</LoginGuard>
			<ClassScheduleTable schedule={$page.data.schedule} />
		</div>
	{:else if selected === "setting"}
		<div class="p-4 flex flex-col">
			<ClassSetting classInfo={info} />
		</div>
	{/if}
</main>
