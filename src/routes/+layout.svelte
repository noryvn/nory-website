<script lang="ts">
	import "../app.css";
	import "@fontsource/abel/400.css";

	import { onMount } from "svelte";
	import { invalidateAll, goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { browser } from "$app/environment";
	import { supabaseClient } from "$lib/supabaseClient";
	import { noryClient, accessToken } from "$lib/nory";
	import { QUERY } from "$lib/constant";

	$: if (browser && $accessToken) {
		setSession($accessToken);
	}

	async function setSession(accessToken: string) {
		const res = await fetch("/api/session", {
			method: "PUT",
			body: JSON.stringify({ accessToken })
		});
		if (!res.ok) {
			// TODO: handle error
		}
		let redirectUrl = $page.url.searchParams.get(QUERY.AFTER_LOGIN);
		if ($page.url.pathname === "/login" || $page.url.pathname === "/signup") {
			redirectUrl ||= new URL("/user", $page.url);
		}
		if (redirectUrl) {
			goto(redirectUrl);
		}
	}

	onMount(() => {
		const { data } = supabaseClient.auth.onAuthStateChange((event, session) => {
			if (event === "SIGNED_OUT") {
				accessToken.set(null);
				invalidateAll();
				return;
			}
			if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
				accessToken.set(session.access_token);
				return;
			}
		});
		return () => {
			data.subscription.unsubscribe();
		};
	});
</script>

<div class="font-abel min-h-screen flex flex-col bg-base-100">
	<slot />
</div>
