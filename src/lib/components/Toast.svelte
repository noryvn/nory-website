<script lang="ts">
	export let t
	export let msg
</script>

<div class="alert alert-{t}">
	{msg}
</div>

<style lang="postcss">
	.keep {
		@apply alert-success alert-info alert-warning
	}

	:global(*) {
		@apply font-abel
	}
</style>