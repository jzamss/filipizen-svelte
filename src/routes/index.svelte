<script>
	import Button from '@smui/button';
</script>

<svelte:head>
	<title>Welcome - Filipizen</title>
</svelte:head>

<div class="container">
	<div>
		<img src="/public/assets/filipizen.svg" alt="Filipizen" width="220" />
		<h1>Experience ease of doing business with the government</h1>
		<p>Over 50 local government units participating all over the Philippines</p>
	</div>
	<div class="actions">
		<Button href="/partners" variant="raised" color="primary">Start</Button>
	</div>
</div>

<style>
	.container {
		max-width: 600px;
		margin: 0 auto;
	}

	img {
		margin-top: 2rem;
	}

	h1 {
		font-weight: 800;
		font-size: 3rem;
		margin-top: 2rem;
	}

	p {
		margin-top: 2rem;
		font-size: 1.25rem;
		opacity: 0.8;
	}

	.actions {
		text-align: center;
		margin-top: 3rem;
	}
</style>
