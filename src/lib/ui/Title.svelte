<script>
	let clz = '';
	export { clz as class };
</script>

<h1 class={clz}><slot /></h1>

<style>
	h1 {
		font-size: 1.65rem;
		font-weight: 700;
	}
</style>
