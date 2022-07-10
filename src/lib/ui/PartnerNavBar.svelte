<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import partners from '$lib/stores/partners.js';

	let partnername = '';
	let groupname = '';

	if ($page.params.partnername) {
		partnername = $page.params.partnername;
		groupname = $page.params.groupname;
	} else {
		partnername = $page.url.searchParams.get('partnername');
		groupname = $page.url.searchParams.get('groupname');
	}

	let partner = {};

	onMount(async () => {
		await partners.load();
		partner = partners.findByNames({ partnername, groupname });
	});
</script>

<div class="container">
	{#if partner.id}
		<a href={`/partners/${partner.group.name}_${partner.name}`} alt="Goto partners">
			<img src={`/public/assets/${partner.id}.png`} alt={partner.title} width="40" />
		</a>
		<h2>{partner.title}</h2>
	{/if}
</div>

<style>
	.container {
		padding: 5px 20px;
		background-color: rgb(44, 62, 80);
		display: flex;
		align-items: center;
		width: 100%;
	}

	h2 {
		color: white;
		font-size: 1.5rem;
		margin-left: 10px;
		font-weight: 600;
	}

	@media (min-width: 480px) {
		.container {
			padding: 5px 40px;
		}
	}

	@media (min-width: 980px) {
		.container {
			padding: 5px 100px;
		}
	}
</style>
