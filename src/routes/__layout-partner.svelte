<script>
	import PartnerLayout from '$lib/ui/PartnerLayout.svelte';
	import PartnerNavBar from '$lib/ui/PartnerNavBar.svelte';
</script>

<PartnerLayout>
	<div slot="header">
		<PartnerNavBar />
	</div>
	<div class="content">
		<slot />
	</div>
</PartnerLayout>

<style>
	.content {
		padding: 20px 20px;
		min-height: 90vh;
	}
</style>
