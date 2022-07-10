<script>
	import PartnerLayout from '$lib/ui/PartnerLayout.svelte';
	import PartnerNavBar from '$lib/ui/PartnerNavBar.svelte';
</script>

<PartnerLayout>
	<div slot="header">
		<PartnerNavBar />
	</div>
	<slot />
</PartnerLayout>
