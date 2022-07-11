<script>
	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
	import { numberFormat, currencyFormat, dateFormat, timeFormat } from '$lib/helpers/helper.js';

	export let title = '';
	export let items = [];
	export let columns = [];
	export let totals = [];

	const formatters = {
		numeric: numberFormat,
		currency: currencyFormat,
		date: dateFormat,
		time: timeFormat
	};

	const defaultFormatter = (value) => value;

	const getValue = (column, item) => {
		const { type, expr, formatter: userFormatter } = column;
		const formatter = userFormatter || formatters[type] || defaultFormatter;
		return formatter(typeof expr === 'function' ? expr(item) : item[expr]);
	};
</script>

<div class="container">
	{#if title}
		<h2>{title}</h2>
	{/if}
	<DataTable table$aria-label={title} style="width: 100%;">
		<Head>
			<Row>
				{#each columns as column (column.label)}
					<Cell numeric={column.type === 'numeric' ? true : false}>{column.label}</Cell>
				{/each}
			</Row>
		</Head>
		<Body>
			{#each items as item}
				<Row>
					{#each columns as column}
						<Cell numeric={column.type === 'numeric' ? true : false}>{getValue(column, item)}</Cell>
					{/each}
				</Row>
			{/each}
			{#if totals.length > 0}
				<Row>
					{#each totals as total}
						<Cell
							colspan={total.colspan || 0}
							numeric={total.type === 'numeric'}
							style={`${total.style || ''}`}>{total.label}</Cell
						>
					{/each}
				</Row>
			{/if}
		</Body>
	</DataTable>
</div>

<style>
	.container {
		width: 100%;
	}

	h2 {
		font-weight: 700;
		margin-bottom: 5px;
	}
</style>
