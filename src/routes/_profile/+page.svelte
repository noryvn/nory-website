<script lang="ts">
	import Icon from "@iconify/svelte";
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	import { getNoryClient } from "$lib/nory";
	import { supabaseClient } from "$lib/supabaseClient";

	$: user = $page.data.userData;

	async function getUser() {
		const noryClient = await getNoryClient(supabaseClient);
		const { data } = await noryClient.getProfile();
		user = data;
	}

	onMount(() => {
		getUser();
	});
</script>

<main class="p-4 w-full flex-auto flex flex-col">
	<div class="avatar p-10 mx-auto">
		<div class="w-48 rounded-full">
			<img src="//kucing.falentio.com/seed/{user?.userId}/300" alt="{user?.username} profile" />
		</div>
	</div>
	<h1 class="text-3xl">
		{user?.name}
	</h1>
	<div>
		<span class="tooltip select-none" data-tip="username"> @{user?.username} </span>
	</div>
	<div class="flex flex-row items-center gap-1">
		<Icon icon="mdi:email-outline" />
		<span class="tooltip select-none select-none" data-tip="email"> {user?.email} </span>
	</div>
	<div class="text-2xl">Statistics</div>
	<div class="stats shadow stats-vertical">
		<div class="stat">
			<div class="stat-title">Joined Class</div>
			<div class="stat-value">{user?.userStatistics.joinedClass}</div>
		</div>
		<div class="stat">
			<div class="stat-title">Owned Class</div>
			<div class="stat-value">{user?.userStatistics.ownedClass}</div>
		</div>
	</div>
</main>
