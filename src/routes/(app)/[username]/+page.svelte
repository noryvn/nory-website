<script lang="ts">
	import type { PageData } from "./$types"
	import { page } from "$app/stores"

	export let data: PageData
	$: ({ user } = data)

	$: ownedClass = Array.from(user.ownedClass).sort((a, b) => a.name.localeCompare(b.name))
</script>

<div class="p-6 max-w-xl container mx-auto space-y-4">
	<div 
		class="flex flex-row"
	>
		<div class="h-20 avatar">
			<div class="rounded-full">
				<img src="//kucing.falentio.com/seed/{user.userId}/250" />
			</div>
		</div>
		<div class="flex flex-col px-2 w-3/4">
			<h1 class="text-2xl truncate"> {user.name} </h1>
			<span class="text-lg"> {user.username} </span>
		</div>
	</div>

	<div class="divider"> Kelas </div>

	<div class="grid grid-cols-1 max-w-sm gap-2 mx-auto">
		{#each ownedClass as c (c.classId)}
			<section class="flex p-4 bg-base-200 justify-between rounded shadow">
				<h2 class="text-2xl"> {c.name} </h2>

				<a class="btn btn-sm btn-primary" href="{$page.url.href}/{c.name}"> Kunjungi </a>
			</section>
		{/each}
	</div>
</div>

<style>
	div:has(h1) .text-lg::before {
		content: '@';
		display: inline-block;
		height: 100%;
	}
</style>