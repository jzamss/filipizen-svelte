<script>
	import NavBar from './NavBar.svelte';
	import Footer from './Footer.svelte';
</script>

<div class="container">
	<NavBar />
	<slot name="header" />
	<main>
		<div class="main-content">
			<slot />
		</div>
	</main>
	<Footer />
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
	}
	main {
		min-height: 95vh;
		display: flex;
		flex-grow: 1;
	}

	/* class="max-w-7xl mx-auto py-6 px-6 md:px-10 lg:px-12" */
	.main-content {
		max-width: 768px;
		margin: 0 auto;
		padding: 6px;
	}
</style>
