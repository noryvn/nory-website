<script lang="ts">
	import { loggedIn } from "$lib/nory"
</script>

{#if $loggedIn}
	<slot />
{/if}