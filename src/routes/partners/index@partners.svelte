<script>
	import LinearProgress from '@smui/linear-progress';
	import partners from '$lib/stores/partners.js';
	import PartnerList from '$lib/components/partners/PartnerList.svelte';
</script>

<svelte:head>
	<title>Filipizen - Partners</title>
</svelte:head>

<div>
	{#await partners.load()}
		<LinearProgress indeterminate />
	{:then data}
		<PartnerList partners={data.partners} error={data.error} />
	{:catch err}
		<pre>{JSON.stringify(err)}</pre>
	{/await}
</div>
