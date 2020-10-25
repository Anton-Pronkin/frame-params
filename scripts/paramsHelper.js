function getUrlParams(url)
{
	let params = [];

	let urlParts = url.split(/[&\?]/);
	for (let i = 1; i < urlParts.length; i++)
	{
		addParam(params, urlParts[i]);
    }
    
    function addParam(params, param) {
        let paramParts = param.split(/[=#]/);
        if (paramParts.length < 2)
        {
            return;
        }
	
        let name = decodeURIComponent(paramParts[0]);
        let value = decodeURIComponent(paramParts[1]);

        params.push({
            name: name,
            value: value
        });
    }

	return params;
}

function getUrlPage(url) {
    let match = url.match(/.*:\/\/.*\/([^\?]*).*/);
    return match && match[1];
}
