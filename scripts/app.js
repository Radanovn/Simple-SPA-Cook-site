const app = Sammy("#rooter", function () {
    this.use('Handlebars', 'hbs');
    
    // Home
    this.get('#/home', homeController.getHome);

    // User
    this.get('#/login', userController.getLogin);
    this.post('#/login', userController.postLogin);

    this.get('#/register', userController.getRegister);
    this.post('#/register', userController.postRegister);

    this.get('#/logout', userController.logout);

    // Recipes
    this.get('#/addMovie',recipeController.getCreateRecipe);
    this.post('#/addMovie',recipeController.postCreateRecipe);
    this.get('#/recipe/:id',recipeController.getDetailsRecipe);


    this.get('#/edit/:id',recipeController.getEditRecipe);
    this.post('#/edit/:id',recipeController.postEditRecipe);

    this.get('#/delete/:id',recipeController.postDeleteRecipe);

    this.get('#/like/:id',recipeController.postLike);

    this.get('#/create',recipeController.getCreateRecipe);
    this.post('#/create',recipeController.postCreateRecipe);

});

(() => {
    app.run('#/home');
})();