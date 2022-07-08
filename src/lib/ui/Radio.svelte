<script>
	import Radio from '@smui/radio';

	export let group = undefined;
	export let value;
	export let label = '';
</script>

<div>
	<Radio bind:group {value} />
	<span>{label}</span>
</div>

<style>
	div {
		display: flex;
		align-items: center;
	}
</style>
