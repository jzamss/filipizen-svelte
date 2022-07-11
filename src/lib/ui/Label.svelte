<script>
	export let value = '';
	export let label = '';
	export let labelWidth = 160;
	export let visibleWhen = true;
	export let valueStyle = '';
	export let spaceBetween = undefined;
</script>

{#if visibleWhen}
	<div class:spaceBetween>
		<div class="label" style="width: {labelWidth}px;">{label}</div>
		<span style={valueStyle}>{value}</span>
	</div>
{/if}

<style>
	div {
		display: flex;
	}

	.spaceBetween {
		justify-content: space-between;
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
