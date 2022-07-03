<script>
	// import LinearProgress from '@smui/linear-progress';
	import partners from '$lib/stores/partners.js';
	import PartnerList from '$lib/components/partners/PartnerList.svelte';
</script>

<svelte:head>
	<title>Filipizen - Partners</title>
</svelte:head>

<div class="container">
	{#await partners.load()}
		<!-- <LinearProgress indeterminate /> -->
		<p>Loading...</p>
	{:then $partners}
		<PartnerList partners={$partners} />
	{:catch err}
		<pre>{JSON.stringify(err)}</pre>
	{/await}
</div>
