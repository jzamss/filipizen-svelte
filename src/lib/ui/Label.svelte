<script>
	export let value;
	export let label = '';
	export let labelWidth = 160;
	export let visibleWhen = true;
</script>

{#if visibleWhen}
	<div>
		<div class="label" style="width: {labelWidth}px;">{label}</div>
		<span>{value}</span>
	</div>
{/if}

<style>
	div {
		display: flex;
	}

	.label {
		font-size: 0.825rem;
		font-weight: 700;
		color: rgb(83, 82, 82);
	}

	span {
		font-size: 0.825rem;
	}
</style>
