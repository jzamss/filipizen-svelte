export const groupBy = (list, key) => {
	return list.reduce((rv, item) => {
		(rv[item[key]] = rv[item[key]] || []).push(item);
		return rv;
	}, {});
};
