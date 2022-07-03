<script>
	import NavBar from './NavBar.svelte';
	import Footer from './Footer.svelte';
</script>

<div class="container">
	<NavBar />
	<slot name="header" />
	<slot name="progress" />
	<main>
		<slot />
	</main>
	<Footer />
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
	}
	main {
		width: 100%;
		margin: 0 auto;
		min-height: 95vh;
		max-width: 768px;
		padding: 20px 20px;
	}
</style>
