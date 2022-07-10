<script>
	import { page } from '$app/stores';
	import { mdiAlertCircle } from '@mdi/js';
	import { Icon } from '@smui/icon-button';
	import { Svg } from '@smui/common/elements';
	import Paper, { Content } from '@smui/paper';
	import Button from '$lib/ui/Button.svelte';
	import Container from '$lib/ui/Container.svelte';

	const partnername = $page.url.searchParams.get('partnername');
	const groupname = $page.url.searchParams.get('groupname');
</script>

<div>
	<Container>
		<Paper>
			<Content
				style="display: flex; flex-direction: column; align-items: center; max-width: 340px; padding: 0 20px;"
			>
				<div class="icon-container">
					<Icon component={Svg} viewBox="0 0 24 24">
						<path fill="currentColor" d={mdiAlertCircle} />
					</Icon>
				</div>
				<h2>Processing Error</h2>
				<div class="info-container">
					<p>Our partner was not able to process your payment.</p>
					<p>Make sure to verify that your credentials are correct upon submitting your payment.</p>
				</div>

				<div>
					<Button href={`/partners/${groupname}_${partnername}`} label="OK" variant="raised" />
				</div>
			</Content>
		</Paper>
	</Container>
</div>

<style>
	.icon-container {
		width: 72px;
		height: 72px;
		color: rgb(222, 0, 0);
	}

	h2 {
		font-size: 1.5rem;
		font-weight: 800;
		margin: 20px 0;
	}

	.info-container {
		text-align: center;
		font-size: 0.85rem;
		opacity: 0.8;
		margin-bottom: 20px;
	}
</style>
