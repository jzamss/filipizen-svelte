export const encodeArgs = (param) => {
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
	const searchParams = encodeArgs(params);

	try {
		const res = await fetch(searchParams ? `${url}?${searchParams}` : url, options);

		if (res.ok) {
			const data = await res.json();
			if (data.error) {
				return { error: data.error };
			} else {
				return { data };
			}
		} else {
			return { error: 'A data error is encountered. Please try again.' };
		}
	} catch (err) {
		return { error: 'Service is currently not available. Please try again later.' };
	}
};

export const postData = async (url, data, options) => {
	options = options || {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	try {
		const res = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
			options
		});

		if (res.ok) {
			const data = await res.json();
			if (data.error) {
				return { error: data.error };
			} else {
				return { data };
			}
		} else {
			return { error: 'A data error is encountered. Please try again.' };
		}
	} catch (err) {
		return { error: 'Service is currently not available. Please try again later.' };
	}
};
