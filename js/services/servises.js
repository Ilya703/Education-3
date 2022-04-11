const postData = async (url, json) => {
    const result = await fetch(url, {
        method: 'POST',
        body: json,
        headers: {
            'Content-type': 'application/json'
        }
    });

    return await result.json();
};

const getResource = async (url) => {
    const result = await fetch(url);

    if (!result.ok) {
        throw new Error(`Could not fetch ${url}, status: ${result.status}`);
    }

    return await result.json();
};

export {postData};
export {getResource};