export const encodeParams = (param) => {
	return Object.keys(param)
		.reduce((arr, key) => {
			if (param.hasOwnProperty(key)) {
				arr.push(`${key}=${param[key]}`);
			} else {
				arr;
			}
			return arr;
		}, [])
		.join('&');
};

export const getData = async (url, params = {}, options = {}) => {
	const searchParams = encodeParams(params);

	let res = null;
	try {
		res = await fetch(searchParams ? `${url}?${searchParams}` : url, options);
	} catch (error) {
		throw new Error('A server error is encountered. Please try again later.');
	}

	if (res.ok) {
		return await res.json();
	}

	throw new Error('A data error is encountered. Please try again later.');
};

export const postData = async (url, data, options) => {
	options = options || {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	let res = null;
	try {
		res = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
			options
		});
	} catch (error) {
		throw new Error('A server error is encountered. Please try again later.');
	}

	if (res.ok) {
		return await res.json();
	}

	throw new Error('A data error is encountered. Please try again later.');
};
