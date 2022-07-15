<script>
	import Paper, { Content } from '@smui/paper';
	import Container from '$lib/ui/Container.svelte';
	import Panel from '$lib/ui/Panel.svelte';
</script>

<Container style="margin-top: 2rem;">
	<Paper>
		<Content>
			<Panel column center>
				<img src="/resources/filipizen.svg" alt="filipizen" />
				<div class="message">Sorry, the page you tried to access cannot be found.</div>
			</Panel>
		</Content>
	</Paper>
</Container>

<style>
	img {
		width: 200px;
	}

	.message {
		margin: 2rem 1rem;
	}
</style>
