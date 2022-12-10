<script lang="ts">
	import { page } from "$app/stores";
</script>

{#if $page.status === 404}
	<section class="max-w-sm container mx-auto text-center">
		<h1 class="text-2xl">Mohon maaf halaman yang anda cari tidak ditemukan.</h1>
	</section>
{:else}
	<section>
		<h1 class="text-5xl">{$page.status}</h1>
		{$page.error.message}
	</section>
{/if}
