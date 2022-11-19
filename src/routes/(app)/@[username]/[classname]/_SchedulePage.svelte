<script lang="ts">
	import type { ClassSchedule } from "$lib/nory";
	import { noryClient } from "$lib/nory";
	import { onMount } from "svelte";
	import ScheduleCurrentCard from "./_ScheduleCurrentCard.svelte";
	import ScheduleList from "./_ScheduleList.svelte";
	import Icon from "@iconify/svelte"

	export let schedules = [] as ClassSchedule[];
	export let name;

	let setting = false;
	let simple = false;
</script>

<div class="max-w-md container mx-auto space-y-4">
	<div class="px-4 py-2 w-full text-center bg-info text-info-content rounded-lg shadow">
		<h2 class="text-3xl">
			Jadwal Kelas {name}
		</h2>
		<button class="w-full" on:click={() => setting = !setting}>
			<Icon icon="ph:caret-double-down" class="mx-auto" />
		</button>
		{#if setting}
			<div class="py-2 h-12">
				<button class="btn btn-sm" on:click={() => (simple = !simple)}>
					{#if simple} Full {:else} Simple {/if}
				</button>
			</div>
		{/if}
	</div>

	<ScheduleList {schedules} {simple} />
</div>
