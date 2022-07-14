<script>
	import NavBar from './NavBar.svelte';
</script>

<div>
	<NavBar />
	<slot name="header" />
	<main>
		<slot />
	</main>
</div>

<style>
	main {
		margin: 0 auto;
		padding: 20px 20px;
	}
</style>
