const homeController = function () {
    const getHome = async function (context) {
        const loggedIn = storage.getData('userInfo') !== null;

        if (loggedIn) {
            const username = JSON.parse(storage.getData('userInfo')).username;
            // const names = JSON.parse(storage.getData('userInfo')).names;
            const firstName = JSON.parse(storage.getData('userInfo')).firstName;
            const lastName = JSON.parse(storage.getData('userInfo')).lastName;

            context.loggedIn = loggedIn;
            context.username = username;
            // context.names = names;
            context.firstName = firstName;
            context.lastName = lastName;



            let response = await recipeModel.getAllRecipes();
            let recipes = await response.json();

            recipes.forEach(recipe => {
                recipe.ingredients = recipe.ingredients.split(', ');
            });

            context.recipes = recipes;

        }

        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs",
            meal: "../views/recipe/meal.hbs"
        }).then(function () {
            this.partial('../views/home/homePage.hbs');
        })
    };

    return {
        getHome
    };
}();