<script>
	import FilipizenLayout from '$lib/ui/FilipizenLayout.svelte';
	import PartnerNavBar from '$lib/ui/PartnerNavBar.svelte';
</script>

<FilipizenLayout>
	<div slot="header">
		<PartnerNavBar />
	</div>
	<slot />
</FilipizenLayout>
