<script lang="ts">
	import NavBar from "$lib/components/NavBar.svelte";
	import Footer from "$lib/components/Footer.svelte";
</script>

<svelte:head>
	<title> Nory is student driven school stuff </title>
</svelte:head>

<NavBar />
<slot />
<Footer />
