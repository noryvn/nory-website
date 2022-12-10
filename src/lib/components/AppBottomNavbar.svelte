<script lang="ts">
	import { theme } from "$lib/theme";
	import Icon from "@iconify/svelte";
	import SwitchThemeButton from "$lib/components/SwitchThemeButton.svelte";

	let dark = $theme === "dark";
	$: $theme = dark ? "dark" : "light";

	const menus = [
		["schedule", "mdi:clock-check-outline", "Jadwal"],
		["task", "mdi:clipboard-check-multiple-outline", "Tugas"]
		// ["setting", "mdi:cog-outline", "Pengaturan"],
	];

	export let selected = menus[0][0];
	export let classId;
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
		<label class="swap swap-flip h-12 w-12">
			<input type="checkbox" name="theme toggle" bind:checked={dark} />

			<Icon icon="carbon:moon" class="swap-off w-8 h-8" />
			<Icon icon="carbon:sun" class="swap-on w-8 h-8" />
		</label>
	</div>
</div>
