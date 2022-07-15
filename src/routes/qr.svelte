<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';

	import Paper, { Content } from '@smui/paper';
	import LinearProgress from '@smui/linear-progress';
	import Container from '$lib/ui/Container.svelte';
	import Panel from '$lib/ui/Panel.svelte';
	import Title from '$lib/ui/Title.svelte';
	import Spacer from '$lib/ui/Spacer.svelte';
	import Error from '$lib/ui/Error.svelte';
	import Text from '$lib/ui/Text.svelte';

	import { getData } from '$lib/helpers/fetch.js';

	let loading = true;
	let error = null;
	let data = writable({});
	let infos = writable([]);

	onMount(async () => {
		const res = await getData('/api/qr', {
			data: $page.url.searchParams.get('data')
		});

		error = res.error;
		if (!error) {
			data.set(res.data.data);
			infos.set(res.data.infos);
		}

		loading = false;
	});
</script>

<Panel style="margin-top: 1rem;">
	<Container>
		<Paper>
			<Content style="display: flex; flex-direction: column; padding: 0 20px;">
				<img src="/resources/filipizen.svg" alt="filipizen" />
				<Title>Document Validation</Title>

				{#if error}
					<Spacer />
					<Error {error} />
				{/if}

				{#if !loading && !error}
					{#each $infos as info}
						{#if info.title}
							<div class="subtitle">{info.title}</div>
						{:else}
							<Panel center>
								<Text bind:value={info.value} label={info.caption} />
							</Panel>
						{/if}
					{/each}
				{/if}
				{#if !error}
					<p class="info">
						The information on this validation document is generated real-time by the partner server
						through www.filipzen.com. Make sure to verify that the information matched with the
						document on hand.
					</p>
				{/if}
				{#if loading}
					<div style="margin:10px 0; top:0; background: red;">
						<LinearProgress indeterminate />
					</div>
				{/if}
			</Content>
		</Paper>
	</Container>
</Panel>

<style>
	.subtitle {
		font-size: 1.125rem;
		font-weight: 500;
		margin: 30px 0px 20px;
		color: rgb(109, 128, 0);
	}

	img {
		width: 200px;
		margin-bottom: 1.5rem;
	}

	.info {
		font-size: 0.7rem;
		color: #7c7c7c;
		line-height: 1.1rem;
		margin-top: 20px;
		max-width: 400px;
	}
</style>
