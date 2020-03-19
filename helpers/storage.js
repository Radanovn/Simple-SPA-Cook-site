const storage = function () {
    const appKey = 'kid_rkOLCneUI';
    const appSecret = '9325239521904da6a3d3df6c6b53899e';

    const getData = function (key) {
        return localStorage.getItem(key + appKey);
    };

    const saveData = function (key, value) {
        localStorage.setItem(key + appKey, JSON.stringify(value));
    };

    const saveUser = function (data) {
        saveData('userInfo', data);
        saveData('authToken', data._kmd.authtoken);
    };

    const deleteUser = function () {
        localStorage.removeItem('userInfo' + appKey);
        localStorage.removeItem('authToken' + appKey);
    };

    return {
        getData,
        saveUser,
        deleteUser,
        appKey,
        appSecret,
    }
}();