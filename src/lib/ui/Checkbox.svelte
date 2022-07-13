<script>
	import FormField from '@smui/form-field';
	import Checkbox from '@smui/checkbox';

	export let checked = false;
	export let label;
</script>

<FormField>
	<Checkbox bind:checked touch />
	<span slot="label">{label}</span>
</FormField>

<style>
	span {
		font-size: 0.85rem;
	}
</style>
