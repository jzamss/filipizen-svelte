<script>
	import Footer from './Footer.svelte';
</script>

<div class="container">
	<slot name="header" />
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
		max-width: 840px;
		padding: 20px 20px;
	}
</style>
