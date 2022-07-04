<script>
	export let href = '#!';
	export let title;
</script>

<p class="">
	<a {href} tabindex="-1">{title}</a>
</p>

<style>
	a {
		text-decoration: none;
		line-height: 1.125rem;
		font-size: 0.825rem;
		color: black;
		color: #8b8b8b;
	}

	a:hover {
		font-weight: 600;
	}
</style>
