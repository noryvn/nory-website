<script lang="ts">
	import Icon from "@iconify/svelte";
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	import { noryClient } from "$lib/nory";
	import { supabaseClient } from "$lib/supabaseClient";

	import UserProfile from "$lib/components/UserProfile.svelte";

	$: user = $page.data.user;
	$: classes = $page.data.classes;
	let selected = "class";
</script>

<main class="w-full flex flex-col">
	<div class="p-4">
		<UserProfile {user} />
	</div>

	<div class="tabs">
		<btn
			on:click={() => (selected = "class")}
			class="tab tab-bordered"
			class:tab-active={selected === "class"}
		>
			Kelas
		</btn>
	</div>

	<section class="my-4 p-4">
		{#if selected === "class"}
			<div class="w-full flex flex-row justify-between">
				<h2>Daftar Kelas:</h2>
				<a href="{$page.url.href}/new-class" class="btn btn-primary btn-sm"> Buat Kelas </a>
			</div>

			<div class="py-4 grid grid-cols-1 gap-2">
				{#each classes as c (c.classId)}
					<div class="card card-bordered bg-base-300 shadow">
						<div class="card-body">
							<span class="card-title"> {c.name} </span>
							<span> {new Date(c.createdAt).toLocaleDateString("en-GB")} </span>
							<div class="card-actions justify-end">
								<a class="btn btn-primary btn-sm" href="/class/{c.classId}"> Kunjungi </a>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</section>
</main>
<div class="flex-auto" />
