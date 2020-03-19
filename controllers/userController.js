const userController = function () {
    const getLogin = function (context) {
        const loggedIn = storage.getData('userInfo') !== null;

        if (loggedIn) {
            const username = JSON.parse(storage.getData('userInfo')).username;
            const firstName = JSON.parse(storage.getData('userInfo')).firstName;
            const lastName = JSON.parse(storage.getData('userInfo')).lastName;
            // const names=JSON.parse(storage.getData('userInfo')).names;
            context.firstName = firstName;
            context.lastName = lastName;
            // context.names=names;
            context.loggedIn = loggedIn;
            context.username = username;
        }

        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs"
        }).then(function () {
            this.partial('../views/user/loginPage.hbs');
        })
    };

    const postLogin = function (context) {
        helper.notify('loading');
        userModel.login(context.params)
            .then(helper.handler)
            .then(data => {
                helper.stopNotify();
                helper.notify('success', 'You just logged in!');
                storage.saveUser(data);
                context.redirect("#", "home");
            })
    };

    const getRegister = function (context) {
        const loggedIn = storage.getData('userInfo') !== null;

        if (loggedIn) {
            const username = JSON.parse(storage.getData('userInfo')).username;
            const firstName = JSON.parse(storage.getData('userInfo')).firstName;
            const lastName = JSON.parse(storage.getData('userInfo')).lastName;
            // const names=JSON.parse(storage.getData('userInfo')).names;
            context.firstName = firstName;
            context.lastName = lastName;
            // context.names=names;
            context.loggedIn = loggedIn;
            context.username = username;
        }

        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs"
        }).then(function () {
            this.partial('../views/user/registerPage.hbs');
        })
    };

    const postRegister = function (context) {
        helper.notify('loading');
        userModel.register(context.params)
            .then(helper.handler)
            .then(data => {
                helper.stopNotify();
                helper.notify('success', 'You just registered!');
                storage.saveUser(data);
                context.redirect("#", "home");
            })
    };

    const logout = function (context) {
        helper.notify('loading');
        userModel.logout()
            .then(helper.handler)
            .then(() => {
                helper.notify('success', 'You just logged out!');
                storage.deleteUser();
                context.redirect("#", "home");
            });
    };


    return {
        getLogin,
        postLogin,
        getRegister,
        postRegister,
        logout
    };
}();