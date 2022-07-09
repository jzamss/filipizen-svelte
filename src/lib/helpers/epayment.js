export const getWebFee = (amount, webfee) => {
	const defaultFee = 20;
	if (!webfee || webfee.objid === undefined) return defaultFee;
	if (/fix/i.test(webfee.type)) return webfee.fee;
	if (!/range/i.test(webfee.type)) return defaultFee;

	const range = webfee.ranges.find((range) => {
		const from = range.from ? range.from : 0.0;
		const to = range.to ? range.to : Number.MAX_SAFE_INTEGER;
		if (amount >= from && amount < to) return true;
		return false;
	});
	return range ? range.fee : defaultFee;
};
