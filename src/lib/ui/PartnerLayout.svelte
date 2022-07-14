<script>
	import Footer from './Footer.svelte';
</script>

<div class="container">
	<slot name="header" />
	<main>
		<slot />
	</main>
</div>
