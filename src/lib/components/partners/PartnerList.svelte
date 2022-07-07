<script>
	import LinearProgress from '@smui/linear-progress';
	import Error from '$lib/ui/Error.svelte';
	import Button from '$lib/ui/Button.svelte';
	import Spacer from '$lib/ui/Spacer.svelte';
	import Panel from '$lib/ui/Panel.svelte';
	import partnerStore, { getClusters } from '$lib/stores/partners.js';

	export let partners = [];
	export let error;

	let reloading = false;
	let clusters = [];
	let timeoutId;

	$: if (partners.length > 0) {
		clusters = getClusters(partners);
	}

	const reload = async () => {
		reloading = true;
		const res = await partnerStore.load();
		error = res.error;
		partners = res.partners || [];
		timeoutId = setTimeout(() => {
			reloading = false;
			clearTimeout(timeoutId);
		}, 1000);
	};
</script>

{#if error}
	{#if reloading}
		<LinearProgress indeterminate />
	{/if}
	{#if !reloading}
		<Error {error} />
		<Spacer />
		<Panel center>
			<Button on:click={reload} label="Reload" variant="outlined" />
		</Panel>
	{/if}
{/if}

{#if !error}
	<h1>Select a Partner Agency</h1>
	<div class="container">
		{#each clusters as cluster (cluster.clusterid)}
			<div class="cluster">
				<h2>
					{cluster.partners[0].group.title}
				</h2>
				{#each cluster.partners as partner (partner.id)}
					<div>
						<a href="/partners/{partner.group.name}_{partner.name}" alt={partner.title}
							>{partner.title} ({partner.id})</a
						>
					</div>
				{/each}
			</div>
		{/each}
	</div>
{/if}

<style>
	.container {
		padding: 0px 10px;
	}

	.cluster {
		width: 300px;
		margin-right: 20px;
	}
	h1 {
		padding: 0px 10px;
	}

	h2 {
		font-size: 1.225rem;
		font-weight: 700;
		color: rgb(39, 174, 96);
		margin-top: 20px;
		margin-bottom: 5px;
	}

	a {
		font-size: 0.95rem;
		text-decoration: none;
		line-height: 1.325rem;
		color: #8b8b8b;
	}

	a:hover {
		font-weight: 600;
	}

	@media (min-width: 480px) {
		.container {
			display: flex;
			flex-direction: column;
			flex-wrap: wrap;
			max-height: 350vh;
			padding: 0px 40px;
		}
		h1 {
			padding: 0px 40px;
		}
	}

	@media (min-width: 768px) {
		.container {
			display: flex;
			flex-direction: column;
			flex-wrap: wrap;
			max-height: 220vh;
			padding: 0px 40px;
		}
		.cluster {
			width: 250px;
		}
		h1 {
			padding: 0px 40px;
		}
	}
</style>
