<script lang="ts">
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	import { supabaseClient } from "$lib/supabaseClient";
	import { QUERY } from "$lib/constant";

	let email: string;
	let password: string;
	let loading = false;
	$: disabled = loading || !email || !password || password?.length < 8;

	async function login() {
		try {
			loading = true;
			const { data, error } = await supabaseClient.auth.signInWithPassword({
				email,
				password
			});
			e = error;
		} finally {
			loading = false;
		}
	}
</script>

<div class="hero min-h-screen">
	<div class="hero-content">
		<form
			on:submit|preventDefault={() => login()}
			class="card w-full max-w-sm bg-base-100 border-base-content border"
		>
			<div class="card-body">
				<div class="text-center">
					<h1 class="font-bold text-4xl">Login</h1>
					<p>Silahkan masukkan email dan password mu</p>
				</div>
				<div class="form-control">
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
				</div>
				<div class="form-control">
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
				</div>
				<div class="card-actions justify-end">
					<button class="btn btn-primary" class:loading {disabled}> Login </button>
				</div>
			</div>
		</form>
	</div>
</div>
