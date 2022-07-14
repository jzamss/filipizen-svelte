<script>
	import PartnerLayout from '$lib/ui/PartnerLayout.svelte';
	import PartnerNavBar from '$lib/ui/PartnerNavBar.svelte';
	import Footer from '$lib/ui/Footer.svelte';
</script>

<PartnerLayout>
	<div slot="header">
		<PartnerNavBar />
	</div>
	<div class="content">
		<slot />
	</div>
</PartnerLayout>
<Footer />

<style>
	.content {
		padding: 20px 20px;
		min-height: 80vh;
	}
</style>
