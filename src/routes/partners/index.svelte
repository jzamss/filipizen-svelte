<script>
	import FilipizenLayout from '$lib/ui/FilipizenLayout.svelte';
	import LinearProgress from '@smui/linear-progress';
	// import PartnerList from '$lib/partners/PartnerList.svelte';
	// import { getPartners } from '$lib/partners/partners-store';

	// const response = getPartners();
</script>

<svelte:head>
	<title>Filipizen - Partners</title>
</svelte:head>

<FilipizenLayout>
	<div slot="progress">
		<LinearProgress indeterminate />
	</div>
	<div class="container">
		<h1>Partners</h1>
	</div>
</FilipizenLayout>

<style>
	.container {
		background-color: red;
	}
</style>
