<script lang="ts">
	import { theme } from "$lib/theme";
	import Icon from "@iconify/svelte";

	let dark = $theme === "dark";
	$: $theme = dark ? "dark" : "light";
</script>

<label class="swap swap-flip h-12 w-12">
	<input type="checkbox" name="theme toggle" bind:checked={dark} />

	<Icon icon="carbon:moon" class="swap-off w-8 h-8" />
	<Icon icon="carbon:sun" class="swap-on w-8 h-8" />
</label>
