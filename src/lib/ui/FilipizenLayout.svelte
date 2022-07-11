<script>
	import NavBar from './NavBar.svelte';
	import Footer from './Footer.svelte';
</script>

<div>
	<NavBar />
	<slot name="header" />
	<main>
		<slot />
	</main>
	<Footer />
</div>

<style>
	main {
		margin: 0 auto;
		padding: 20px 20px;
	}
</style>
