<script lang="ts">
	import Icon from "@iconify/svelte";
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	import { noryClient } from "$lib/nory";
	import { supabaseClient } from "$lib/supabaseClient";

	import UserProfile from "$lib/components/UserProfile.svelte";
	import UserSetting from "$lib/components/UserSetting.svelte";

	import CreateClassForm from "./_CreateClassForm.svelte";

	$: user = $page.data.user;
	$: members = $page.data.members;
	let selected = "class";
	let showCreateClassForm = false;
</script>

<main class="w-full flex flex-col">
	<div class="p-4">
		<UserProfile {user} />
	</div>

	<div class="p-4">
		{#if user.name === user.username}
			<div class="alert alert-warning">anda belum merubah username</div>
		{/if}
	</div>

	<div class="tabs">
		<btn
			on:click={() => (selected = "class")}
			class="tab tab-bordered"
			class:tab-active={selected === "class"}
		>
			Kelas
		</btn>
		<btn
			on:click={() => (selected = "setting")}
			class="tab tab-bordered"
			class:tab-active={selected === "setting"}
		>
			Pengaturan
		</btn>
	</div>

	<section class="my-4 px-4">
		{#if selected === "class"}
			<div class="w-full flex flex-col space-y-2 justify-between">
				<button
					on:click={() => (showCreateClassForm = !showCreateClassForm)}
					class="btn btn-primary btn-sm"
				>
					Buat Kelas
				</button>
				<CreateClassForm bind:show={showCreateClassForm} />
				<h2>Daftar Kelas:</h2>
			</div>

			<div class="py-4 grid grid-cols-1 gap-2">
				{#each members as m (m.classId)}
					<div class="card card-bordered card-compact bg-base-300 shadow">
						<div class="card-body">
							<span class="card-title">
								{#await noryClient.getClassInfo(m.classId)}
									{m.classId}
								{:then { data: c }}
									{c.name}
								{:catch e}
									{e.message}
								{/await}
							</span>
							<div class="card-actions justify-end">
								<a class="btn btn-primary btn-sm" href="/class/{m.classId}"> Kunjungi </a>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{:else if selected === "setting"}
			<UserSetting username={user.username} name={user.name} />
		{/if}
	</section>
</main>
<div class="flex-auto" />
