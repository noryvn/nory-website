<script lang="ts">
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	import { supabaseClient } from "$lib/supabaseClient";
	import { QUERY } from "$lib/constant";

	let email: string;
	let password: string;
	let passwordCheck: string;
	let loading = false;
	let error = null;
	let success = false;
	$: passwordNotMatch = password !== passwordCheck && password && passwordCheck;
	$: disabled =
		loading || !email || !password || !passwordCheck || passwordNotMatch || password?.length < 8;

	async function signup() {
		try {
			loading = true;
			success = false;
			const { data, error: e } = await supabaseClient.auth.signUp({
				email,
				password
			});

			success = true;
			error = e;
		} catch (e) {
			error = e;
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
				<h1 class="font-bold text-4xl">Sign Up</h1>
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
				<label class="label">
					<span class="label-text"> Ketik Ulang Password </span>
				</label>
				<input
					bind:value={passwordCheck}
					type="password"
					name="passwordCheck"
					placeholder="password"
					class="input input-bordered"
				/>
				{#if passwordNotMatch}
					<div class="text-error mt-2">Password yang kakak masukan tidak sama</div>
				{/if}
			</form>
			<div class="flex flex-row flex-wrap justify-end pt-2">
				<p class="w-full text-center">
					Sudah punya akun?
					<a href="/login" class="link link-primary"> login </a>
				</p>
				<button
					type="button"
					class="btn btn-primary"
					on:click={() => signup()}
					class:loading
					{disabled}
				>
					Signup
				</button>
			</div>
			<div class="py-4 flex flex-col">
				{#if success}
					<div class="alert alert-info">
						Silahkan check kotak emailmu untuk melkukan konfirmasi.
					</div>
				{/if}

				{#if error}
					<div class="alert alert-error">
						{error.message || error}
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
