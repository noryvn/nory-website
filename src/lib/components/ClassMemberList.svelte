<script lang="ts">
	import type { ClassMember } from "$lib/nory";
	import { noryClient } from "$lib/nory";
	import { page } from "$app/stores";
	import { invalidateAll } from "$app/navigation";
	import Icon from "@iconify/svelte";

	export let members: ClassMember[];

	let i = 1108;
	const levelCompare = {
		owner: i--,
		member: i--,
		admin: i--
	};

	$: m = Array.from(members).sort((a, b) => levelCompare[b.level] - levelCompare[a.level]);

	let loading = false;
	let error: null | Error = null;
	function removeUser(userId: string) {
		return async () => {
			try {
				loading = true;
				error = null;
				await noryClient.removeClassMember($page.params.classId, userId);
				await invalidateAll();
			} catch (e) {
				error = e;
			} finally {
				loading = false;
			}
		};
	}

	function setAdmin(userId: string) {
		return async () => {
			try {
				loading = true;
				error = null;
				await noryClient.updateClassMember($page.params.classId, userId, { level: "admin" });
				await invalidateAll();
			} catch (e) {
				error = e;
			} finally {
				loading = false;
			}
		};
	}

	function setMember(userId: string) {
		return async () => {
			try {
				loading = true;
				error = null;
				await noryClient.updateClassMember($page.params.classId, userId, { level: "member" });
				await invalidateAll();
			} catch (e) {
				error = e;
			} finally {
				loading = false;
			}
		};
	}
</script>

<div class="overflow-x-auto {$$props.class}">
	{#if error}
		<div class="alert alert-error">
			{error.message}
		</div>
	{/if}
	<table class="table w-full">
		<thead>
			<tr>
				<th />
				<th> Username </th>
				<th> Level </th>
				<th> Aksi </th>
			</tr>
		</thead>
		<tbody>
			{#each m as member, i (member.userId)}
				<tr>
					<th> {i + 1}.</th>
					<th class="flex items-center gap-2">
						<div class="avatar">
							<div class="h-12 rounded-full">
								<img
									alt="{member.userId} profile"
									src="//kucing.falentio.com/seed/{member.userId}/150"
								/>
							</div>
						</div>
						{#await noryClient.getProfileById(member.userId)}
							<span class="w-36"> Loading... </span>
						{:then { data: user }}
							<span> {user.name} </span>
						{:catch e}
							<span class="text-error"> Error: {e.message} </span>
						{/await}
					</th>
					<th> {member.level} </th>
					<th>
						<div>
							<button
								disabled={member.level === "owner"}
								on:click={removeUser(member.userId)}
								class:loading
								class="btn btn-primary btn-sm"
							>
								Kick
							</button>
							<button
								disabled={member.level === "owner" || member.level === "member"}
								on:click={setMember(member.userId)}
								class:loading
								class="btn btn-primary btn-sm"
							>
								Demote
							</button>
							<button
								disabled={member.level === "owner" || member.level === "admin"}
								on:click={setAdmin(member.userId)}
								class:loading
								class="btn btn-primary btn-sm"
							>
								Promote
							</button>
						</div>
					</th>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
