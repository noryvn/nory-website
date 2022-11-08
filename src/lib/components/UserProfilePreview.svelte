<script lang="ts">
	import { noryClient, user } from "$lib/nory";
</script>

<div class="flex flex-row gap-2 items-center h-12 w-full mb-2">
	<div class="avatar">
		<div class="w-12 rounded-full">
			<img alt="{$user.username} profile" src="//kucing.falentio.com/seed/{$user.userId}/300" />
		</div>
	</div>
	<a class="text-xl link link-info" href="/user"> @{$user.username} </a>
</div>
