<script>
	export let href = '#!';
	export let title;
</script>

<p class="">
	<a {href}>{title}</a>
</p>

<style>
	a {
		text-decoration: none;
		line-height: 1.125rem;
		font-size: 0.825rem;
		color: black;
		opacity: 0.8;
	}

	a:hover {
		font-weight: 600;
	}
</style>
