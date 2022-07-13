import dayjs from 'dayjs';

const locale = 'en-PH';
export const numberFormat = (value, fraction = 2) => {
	const options = { minimumFractionDigits: fraction };
	return new Intl.NumberFormat(locale, options).format(value);
};

export const currencyFormat = (amount) => {
	const options = { style: 'currency', currency: 'PHP' };
	return new Intl.NumberFormat(locale, options).format(amount);
};

export const groupBy = (list, key) => {
	return list.reduce((rv, item) => {
		(rv[item[key]] = rv[item[key]] || []).push(item);
		return rv;
	}, {});
};

export const isEmpty = (value) => {
	if (typeof value === undefined) return true;
	if (Array.isArray(value) && value.length === 0) return true;
	return typeof value === 'string' ? value.trim().length === 0 : !value;
};

export const isNonEmpty = (value) => {
	return !isEmpty(value);
};

export const isLength = (value, len) => {
	if (isEmpty(value)) return false;
	return value.toString().trim().length === len;
};

export const dateFormat = (dt, options = { year: 'numeric', month: 'long', day: 'numeric' }) => {
	return new Intl.DateTimeFormat(locale, options).format(dt);
};

export const timeFormat = (
	dt,
	options = { hour: 'numeric', minute: 'numeric', second: 'numeric' }
) => {
	return new Intl.DateTimeFormat(locale, options).format(dt);
};

export const range = (min, max) => [...Array(max - min + 1).keys()].map((i) => i + min);

export const currentDate = dayjs();

export const dateAdd = (duration, unit = 'd') => {
	return dayjs().add(duration, unit).toISOString();
};

export const formatDate = (dt, pattern = 'MMMM D, YYYY') => {
	return dayjs(dt).format(pattern);
};

export const isDateBefore = (dt, refDate) => {
	return dayjs(dt).isBefore(refDate);
};

export const isDateAfter = (dt, refDate) => {
	if (refDate) {
		return dayjs(dt).isAfter(refDate);
	}
	return dayjs(dayjs(dt)).isAfter();
};
