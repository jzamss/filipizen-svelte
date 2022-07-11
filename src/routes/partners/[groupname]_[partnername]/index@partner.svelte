<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import partners from '$lib/stores/partners.js';
	import { getModules } from '$lib/modules.js';

	const { partnername, groupname } = $page.params;
	let partner = {};
	let modules = [];

	onMount(async () => {
		await partners.load();
		partner = partners.findByNames({ partnername, groupname });
		modules = getModules(partner);
	});
</script>

<h1>Select Transaction</h1>
<div class="container">
	{#each modules as module (module.name)}
		<div class="cluster">
			<h2>
				{module.title}
			</h2>
			{#each module.services as service (service.name)}
				<div>
					<a href="{$page.url.pathname}/{module.name}/{service.name}" alt={service.name}
						>{service.title}</a
					>
				</div>
			{/each}
		</div>
	{/each}
</div>

<style>
	.cluster {
		width: 300px;
		margin-right: 20px;
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
		line-height: 1.525rem;
		color: #3f51b5;
	}

	a:hover {
		text-decoration: underline;
	}

	@media (min-width: 480px) {
		.container {
			display: flex;
			flex-direction: column;
			flex-wrap: wrap;
			max-height: 350vh;
			padding: 0px 80px;
		}
		h1 {
			padding: 0px 80px;
		}
	}

	@media (min-width: 768px) {
		.container {
			display: flex;
			flex-direction: column;
			flex-wrap: wrap;
			max-height: 100vh;
			padding: 0px 200px;
		}
		.cluster {
			width: 250px;
		}
		h1 {
			padding: 0px 200px;
		}
	}
</style>
