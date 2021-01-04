export default class UrlUtil {
    static *getParams(url) {
        const paramSeparatorPattern = /[&\?]/;

        let urlParts = url.split(paramSeparatorPattern);
        for (const urlPart of urlParts) {
            let {isCorrect, name, value} = UrlUtil.parseParam(urlPart);

            if (isCorrect) {
                yield { name, value }
            }
        }
    }

    static parseParam(param) {
        const nameValueSeparatorPattern = "=";

        let paramParts = param.split(nameValueSeparatorPattern);
        if (paramParts.length < 2)
        {
            return { isCorrect: false };
        }
    
        return {
            isCorrect: true,
            name: decodeURIComponent(paramParts[0]),
            value: decodeURIComponent(paramParts[1])
        }
    }

    static getPage(url) {
        const pagePattern = /.*:\/\/.*\/([^\?#]*).*/;

        let match = url.match(pagePattern);
        return match && match[1];
    }
}