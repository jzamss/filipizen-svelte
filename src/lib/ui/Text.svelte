<script>
	export let label = '';
	export let value = '';
</script>

<div class="container">
	<label for="value">{label}</label>
	<div id="value">{value}</div>
</div>

<style>
	.container {
		position: relative;
		box-sizing: border-box;
		display: inline-flex;
		flex-direction: column;
		vertical-align: top;
		border-bottom: 1px solid #aaaaaa;
		font-family: 'Robot', 'Helvetica', 'Arial', sans-serif;
		margin-bottom: 10px;
		min-height: 2.85rem;
		width: 100%;
	}

	label {
		font-size: 0.735rem;
		font-weight: 400;
		opacity: 0.6;
		line-height: 0.7rem;
	}

	#value {
		padding: 6px 0 7px;
		border: 0;
		font: inherit;
		min-height: 1.1876em;
	}

	.container:hover {
		border-bottom: 2px solid gray;
	}
</style>
