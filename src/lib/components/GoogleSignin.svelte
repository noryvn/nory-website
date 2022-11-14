<script lang="ts">
	import { theme } from "$lib/theme"

	$: src = $theme === "dark" ? "/google-sign-in/dark.png" : "/google-sign-in/light.png"
</script>

<div class="max-w-sm h-full">
	<img {src} class="h-full">
</div>
