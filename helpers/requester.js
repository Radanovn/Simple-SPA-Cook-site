const requester = function () {
    const baseUrl = 'https://baas.kinvey.com';

    const get = function (url,headers) {
        headers.method = 'get';
        return makeRequest(url,headers);
    };  

    const post = function (url,headers) {
        headers.method = 'post';
        return makeRequest(url,headers);
    };  

    const put = function (url,headers) {
        headers.method = 'put';
        return makeRequest(url,headers);
    };  

    const del = function (url,headers) {
        headers.method = 'delete';
        return makeRequest(url,headers);
    };  

    const makeRequest = function (url,headers) {
        headers.headers['Content-Type'] = 'application/json';

        if (storage.getData('userInfo') !== null) {
            const token = JSON.parse(storage.getData('authToken'));
            headers.headers['Authorization'] = `Kinvey ${token}`;
        }

        return fetch(baseUrl + url,headers);
    };  

    return {
        get,
        post,
        put,
        del,
    };
}();