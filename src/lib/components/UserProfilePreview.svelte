<script lang="ts" context="module">
	import type { User } from "$lib/nory";
	let cachedUser: User | null = null;
</script>

<script lang="ts">
	import type { User } from "$lib/nory";
	import { noryClient } from "$lib/nory";
	import { supabaseClient } from "$lib/supabaseClient";
	import { onMount } from "svelte";

	let authenticated = false;
	let error: Error | null = null;
	let user: User | null = cachedUser;

	async function checkAuthentication() {
		const { data, error: e } = await supabaseClient.auth.getSession();
		if (e) {
			error = e;
			console.error(e);
			return;
		}

		if (data.session) {
			authenticated = true;
		}
	}

	async function getProfile() {
		try {
			const { data } = await noryClient.getProfile();
			cachedUser = user = data;
		} catch (e) {
			cachedUser = null;
			error = e;
		}
	}

	onMount(() => {
		checkAuthentication();
		getProfile();
	});
</script>

<div class="flex flex-row gap-2 items-center h-12 w-full mb-2">
	{#if authenticated && user}
		<div class="avatar">
			<div class="w-12 rounded-full">
				<img alt="{user.username} profile" src="//kucing.falentio.com/seed/{user.userId}/300" />
			</div>
		</div>
		<a class="text-xl link link-info" href="/user"> @{user.username} </a>
	{/if}
</div>
