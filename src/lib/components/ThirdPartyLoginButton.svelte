<script lang="ts">
	import Icon from "@iconify/svelte";

	export let icon = "";
</script>

<button
	type="button"
	class="{$$props.class} select-none btn btn-wide btn-primary btn-outline w-full space-x-2 items-center"
	on:click
>
	<Icon {icon} class="h-6 w-6" />
	<span>
		<slot />
	</span>
</button>
