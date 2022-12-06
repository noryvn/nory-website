<script lang="ts">
	import UserProfilePreview from "$lib/components/UserProfilePreview.svelte";
	import SwitchThemeButton from "$lib/components/SwitchThemeButton.svelte";
	import LoginGuard from "$lib/components/LoginGuard.svelte";
	import Icon from "@iconify/svelte";

	let menu = false;
</script>

<nav class="navbar bg-base-100 border-base-content border-b relative">
	<div class="flex-1">
		<a href="/" class="text-2xl"> Nory </a>
	</div>
	<div class="flex-none w-12 h-12">
		<SwitchThemeButton />
	</div>
	<div class="flex-none w-12 h-12">
		<label class="swap swap-rotate">
			<input type="checkbox" bind:checked={menu} />
			<Icon icon="mdi:menu" class="swap-off w-8 h-8" />
			<Icon icon="mdi:close" class="swap-on w-8 h-8" />
		</label>
	</div>
	{#if menu}
		<div class="navbar bg-base-100 border-base-content border-b absolute top-full left-0 z-50">
			<div class="flex-1 flex flex-col items-start">
				<LoginGuard>
					<UserProfilePreview />
				</LoginGuard>
				<a class="text-lg w-full" href="/user"> User </a>
				<a class="text-lg w-full" href="/login"> Login </a>
				<a class="text-lg w-full" href="/signup"> Signup </a>
				<a class="text-lg w-full" href="/privacy-policy"> Kebijakan Privasi </a>
			</div>
		</div>
	{/if}
</nav>
