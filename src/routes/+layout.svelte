<script lang="ts">
	import "../app.css";
	import "@fontsource/abel/400.css";

	import NavBar from "$lib/components/NavBar.svelte";
	import Footer from "$lib/components/Footer.svelte";

	import { onMount } from "svelte";
	import { invalidateAll, goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { browser } from "$app/environment";
	import { supabaseClient } from "$lib/supabaseClient";
	import { noryClient } from "$lib/nory";
	import { QUERY } from "$lib/constant";

	let loading = true;

	if (browser) {
		supabaseClient.auth
			.getSession()
			.then(async ({ data, error }) => {
				const accessToken = data.session?.access_token || null;
				if (!accessToken) {
					return
				}
				noryClient.accessToken = accessToken;

				let redirectUrl = $page.url.searchParams.get(QUERY.AFTER_LOGIN);
				if ($page.url.pathname === "/login" || $page.url.pathname === "/signup") {
					redirectUrl ||= new URL("/user", $page.url);
				}
				if (redirectUrl) {
					goto(redirectUrl);
				}
			})
			.finally(() => {
				loading = false;
			});
	}
	supabaseClient.auth.refreshSession();
	onMount(() => {
		const { data } = supabaseClient.auth.onAuthStateChange((event, session) => {
			if (event === "SIGNED_OUT") {
				noryClient.accessToken = null;
				invalidateAll();
				return;
			}
			if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
				const accessToken = session.access_token;
				noryClient.accessToken = accessToken;

				fetch("/api/session", {
					method: "PUT",
					body: JSON.stringify({ accessToken })
				}).then(() => {
					let redirectUrl = $page.url.searchParams.get(QUERY.AFTER_LOGIN);
					if ($page.url.pathname === "/login" || $page.url.pathname === "/signup") {
						redirectUrl ||= new URL("/user", $page.url);
					}
					if (redirectUrl) {
						goto(redirectUrl);
					}
				});

				return;
			}
		});
		return () => {
			data.subscription.unsubscribe();
		};
	});
</script>

<div data-theme="winter">
	<div class="font-abel min-h-screen flex flex-col bg-base-100">
		<NavBar />
		{#if !loading}
			<slot />
		{/if}
		<Footer />
	</div>
</div>
