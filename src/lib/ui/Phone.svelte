<script>
	import { imask } from 'svelte-imask';

	export let value = null;
	export let label = '';
	export let variant = '';
	export let placeholder = '';

	const options = {
		mask: '(000) 000-0000'
	};

	function complete({ detail: imask }) {
		console.log('completed', imask);
		value = imask._unmaskedValue;
	}
</script>

<div class="container">
	<div class="input-group">
		<span class="label">{placeholder || label}</span>
		<input use:imask={options} name="phone" type="text" on:complete={complete} />
	</div>
</div>

<style>
	.container {
		margin-bottom: 1rem;
	}

	.input-group {
		display: flex;
		flex-direction: column;
		border-bottom: 1px solid #b9b9b9;
		position: relative;
	}

	.label {
		font-size: 0.85rem;
		font-weight: 400;
		opacity: 0.65;
	}

	input {
		border: none;
		outline: none;
		width: 100%;
		font-size: 1rem;
		line-height: 1.5rem;
	}
</style>
