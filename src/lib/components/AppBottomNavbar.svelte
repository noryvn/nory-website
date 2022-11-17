<script lang="ts">
	import Icon from "@iconify/svelte";
	import SwitchThemeButton from "$lib/components/SwitchThemeButton.svelte";

	export let classId;

	const menus = [
		["schedule", "mdi:clock-check-outline", "Jadwal"],
		["task", "mdi:clipboard-check-multiple-outline", "Tugas"],
		// ["setting", "mdi:cog-outline", "Pengaturan"],
	];

	export let selected = menus[0][0];
</script>

<div class="btm-nav text-secondary">
	{#each menus as [name, icon, text] (name)}
		<button class:active={selected === name} on:click={() => (selected = name)}>
			<Icon {icon} />
			<span> {text} </span>
		</button>
	{/each}
	<a href="/class/{classId}">
		<Icon icon="mdi:cog-outline" />
		<span> Pengaturan </span>
	</a>
	<div class="flex-none aspect-square">
		<SwitchThemeButton />
	</div>
</div>
