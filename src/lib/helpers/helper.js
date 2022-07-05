export const groupBy = (list, key) => {
	return list.reduce((rv, item) => {
		(rv[item[key]] = rv[item[key]] || []).push(item);
		return rv;
	}, {});
};

export const isEmpty = (value) => {
	if (!value) return true;
	return value.toString().trim().length === 0;
};

export const isNonEmpty = (value) => {
	return !isEmpty(value);
};

export const isLength = (value, len) => {
	if (isEmpty(value)) return false;
	return value.toString().trim().length === len;
};
