export const getData = async (url, options = {}) => {
	let res = null;
	try {
		res = await fetch(url, options);
	} catch (error) {
		throw new Error('A server error is encountered. Please try again later.');
	}

	if (res.ok) {
		return await res.json();
	}

	throw new Error('A data error is encountered. Please try again later.');
};
