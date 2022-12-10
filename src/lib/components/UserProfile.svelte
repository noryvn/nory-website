<script lang="ts">
	import { page } from "$app/stores";
	export let user;
	$: href = new URL(`/@${user.username}/`, $page.url).href;
</script>

<div class="grid grid-cols-4 gap-4">
	<div class="avatar">
		<div class="max-w-full rounded-full w-36 mx-auto">
			<img src="//kucing.falentio.com/seed/{user?.userId}/300" alt="{user?.username} profile" />
		</div>
	</div>
	<div class="col-span-3">
		<h1 class="text-3xl truncate">
			{user?.name}
		</h1>
		<div class="flex flex-col items-start">
			<span class="tooltip select-none" data-tip="username"> @{user?.username} </span>
			<a {href} class="link link-primary">{href}</a>
		</div>
	</div>
</div>
