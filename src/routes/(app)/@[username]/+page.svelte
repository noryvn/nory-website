<script lang="ts">
	import type { PageData } from "./$types";
	import { noryClient } from "$lib/nory"
	import { page } from "$app/stores";
	import Footer from "$lib/components/Footer.svelte";

	export let data: PageData;
	let date = new Date()
	$: ({ user } = data);
	$: ownedClass = Array.from(user.ownedClass || []).sort((a, b) => a.name.localeCompare(b.name));

	function isCurrentSchedule(schedule: ClassSchedule) {
		if (schedule.day !== date.getDay()) {
			return false
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

		return true
	}

	function addMinutes(date: Date, minutes: number) {
		return new Date(date.getTime() + minutes * 60_000);
	}
</script>

<svelte:head>
	<title> Homepage of @{user.username} ({user.name}) </title>
</svelte:head>

<div class="p-6 max-w-xl container mx-auto space-y-4 grow">
	<div class="flex flex-row">
		<div class="h-20 avatar">
			<div class="rounded-full">
				<img src="//kucing.falentio.com/seed/{user.userId}/250" />
			</div>
		</div>
		<div class="flex flex-col px-2 w-3/4">
			<h1 class="text-2xl truncate">{user.name}</h1>
			<span class="text-lg"> {user.username} </span>
		</div>
	</div>

	<div class="divider">Kelas</div>

	<div class="grid grid-cols-1 max-w-sm gap-2 mx-auto">
		{#each ownedClass as c (c.classId)}
			<section class="flex p-4 bg-base-200 justify-between rounded shadow">
				<div class="flex flex-col w-full">
					<h2 class="text-2xl">{c.name}</h2>
					<div> 
						{#await noryClient.getClassSchedule(c.classId)}
							<span>Loading...</span>
						{:then { data: schedule }}
							{@const current = schedule.find(i => isCurrentSchedule(i))}
							{#if current}
								<span> Pelajaran saat ini: <span class="capitalize"> {current.name} </span></span>
							{:else}
								<span> Pelajaran saat ini: Kosong</span>
							{/if}
						{/await}
					</div>
				</div>

				<div class="flex items-end">
					<a class="btn btn-sm btn-primary" href="{$page.url.href}/{c.name}"> Kunjungi </a>
				</div>
			</section>
		{/each}
	</div>
</div>
<Footer />

<style>
	div:has(h1) .text-lg::before {
		content: "@";
		display: inline-block;
		height: 100%;
	}
</style>
