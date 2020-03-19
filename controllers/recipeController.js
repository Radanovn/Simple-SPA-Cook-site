const recipeController = function () {
    const getCreateRecipe = function (context) {
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
            header: './views/common/header.hbs',
            footer: './views/common/footer.hbs'
        }).then(function () {
            this.partial('./views/recipe/createRecipe.hbs');
        });
    };

    const postCreateRecipe = function (context) {
        helper.notify('loading');
        recipeModel.createRecipe(context.params)
            .then(helper.handler)
            .then(() => {
                helper.stopNotify();
                helper.notify('success', 'You just shared your recipe!');
                homeController.getHome(context);
            });
    };

    const getDetailsRecipe = async function (context) {
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
        let response = await recipeModel.getRecipe(context.params.id);
        let recipe = await response.json();
        recipe.ingredients = recipe.ingredients.split(', ');
        context.recipe = recipe;

        const userId = JSON.parse(storage.getData('userInfo'))._id;
        let isCreator = false;
        if (userId === context.recipe._acl.creator) {
            isCreator = true;
        }
        context.recipe.isCreator = isCreator;

        context.loadPartials({
            header: './views/common/header.hbs',
            footer: './views/common/footer.hbs'
        }).then(function () {
            this.partial('./views/recipe/viewRecipe.hbs');
        });
    };

    const getEditRecipe = async function (context) {
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

        let response = await recipeModel.getRecipe(context.params.id);
        let recipe = await response.json();
        recipe.id = context.params.id;
        context.recipe = recipe;
        context.loadPartials({
            header: './views/common/header.hbs',
            footer: './views/common/footer.hbs'
        }).then(function () {
            this.partial('./views/recipe/editRecipe.hbs');
        });
    };

    const postEditRecipe = function (context) {
        helper.notify('loading');
        recipeModel.editRecipe(context.params)
            .then(helper.handler)
            .then(() => {
                helper.stopNotify();
                helper.notify('success', 'You just edited your recipe!');
                context.redirect("#", `recipe/${context.params.id}`);
            });
    };

    const postDeleteRecipe = function (context) {
        helper.notify('loading');
        recipeModel.deleteRecipe(context.params.id)
            .then(helper.handler)
            .then(() => {
                helper.stopNotify();
                helper.notify('success', 'You just deleted your recipe!');
                context.redirect("#", "home");
            });
    };

    const postLike = async function (context) {
        helper.notify('loading');
        let response = await recipeModel.getRecipe(context.params.id);
        let recipe = await response.json();
        recipe.id = context.params.id;
        recipe.likesCounter = Number(recipe.likesCounter) + 1;
        recipeModel.editRecipe(recipe)
            .then(helper.handler)
            .then(() => {
                helper.stopNotify();
                helper.notify('success', 'You just liked the recipe!');
                context.redirect("#", `recipe/${context.params.id}`);
            });
    }

    return {
        getCreateRecipe,
        postCreateRecipe,
        getDetailsRecipe,
        getEditRecipe,
        postEditRecipe,
        postDeleteRecipe,
        postLike
    }
}();