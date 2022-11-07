<script lang="ts">
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	import { supabaseClient } from "$lib/supabaseClient";
	import { QUERY } from "$lib/constant";
	import { goto } from "$app/navigation";

	let email: string;
	let password: string;
	let loading = false;
	let error: Error | null = null;
	$: disabled = loading || !email || !password || password?.length < 8;

	async function login() {
		try {
			loading = true;
			const { data, error: e } = await supabaseClient.auth.signInWithPassword({
				email,
				password
			});
			error = e;
			let redirectUrl = $page.url.searchParams.get(QUERY.AFTER_LOGIN) || "/user";
			if (redirectUrl) {
				goto(redirectUrl);
			}
		} finally {
			loading = false;
		}
	}
</script>

<div class="hero min-h-screen">
	<div class="hero-content">
		<div
			on:submit|preventDefault={() => login()}
			class="w-[40rem] max-w-sm bg-base-100 border-base-content border p-8 rounded-xl flex flex-col"
		>
			<div class="text-center">
				<h1 class="font-bold text-4xl">Login</h1>
				<p>Silahkan masukkan email dan password mu</p>
			</div>
			<form class="form-control">
				<label class="label">
					<span class="label-text"> Email </span>
				</label>
				<input
					bind:value={email}
					type="text"
					name="email"
					placeholder="nory@falentio.com"
					class="input input-bordered"
				/>
				<label class="label">
					<span class="label-text"> Password </span>
				</label>
				<input
					bind:value={password}
					type="password"
					name="password"
					placeholder="password"
					class="input input-bordered"
				/>
			</form>
			<div class="flex flex-row flex-wrap justify-end pt-2">
				<p class="w-full text-center">
					Belum punya akun?
					<a href="/signup" class="link link-primary"> Signup </a>
				</p>
				<button
					type="button"
					class="btn btn-primary"
					on:click={() => login()}
					class:loading
					{disabled}
				>
					Login
				</button>
			</div>
			{#if error}
				<div class="alert alert-error">
					{error.message}
				</div>
			{/if}
		</div>
	</div>
</div>
