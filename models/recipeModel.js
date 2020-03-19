const recipeModel = function () {
    const createRecipe = function (params) {
        let data = {
            ...params
        };
        data.likes=0;
        switch (data.category) {
            case 'Vegetables and legumes/beans':
                data.categoryImageURL = 'https://cdn.pixabay.com/photo/2017/10/09/19/29/eat-2834549__340.jpg';
                break;
            case 'Grain Food':
                data.categoryImageURL = 'https://cdn.pixabay.com/photo/2014/12/11/02/55/corn-syrup-563796__340.jpg';
                break;
            case 'Fruits':
                data.categoryImageURL = 'https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029__340.jpg';
                break;
            case 'Milk, cheese, eggs and alternatives':
                data.categoryImageURL = 'https://image.shutterstock.com/image-photo/assorted-dairy-products-milk-yogurt-260nw-530162824.jpg';
                break;
            case 'Lean meats and poultry, fish and alternatives':
                data.categoryImageURL = 'https://t3.ftcdn.net/jpg/01/18/84/52/240_F_118845283_n9uWnb81tg8cG7Rf9y3McWT1DT1ZKTDx.jpg';
                break;
            default:
                break;
        }

        let url = `/appdata/${storage.appKey}/recipes`;

        let headers = {
            body: JSON.stringify(data),
            headers: {} 
        };

        return requester.post(url,headers);
    };

    const getAllRecipes = function(){

        let url = `/appdata/${storage.appKey}/recipes`;
        let headers = {
            headers: {}
        };

        return requester.get(url,headers);
    };

    const getRecipe = function (id){
        let url = `/appdata/${storage.appKey}/recipes/${id}`;
        let headers = {
            headers: {}
        };

        return requester.get(url,headers);
    };

    const editRecipe = function (params){
        let url = `/appdata/${storage.appKey}/recipes/${params.id}`;
        let data = {
            ...params
        };
        switch (data.category) {
            case 'Vegetables and legumes/beans':
                data.categoryImageURL = 'https://cdn.pixabay.com/photo/2017/10/09/19/29/eat-2834549__340.jpg';
                break;
            case 'Grain Food':
                data.categoryImageURL = 'https://cdn.pixabay.com/photo/2014/12/11/02/55/corn-syrup-563796__340.jpg';
                break;
            case 'Fruits':
                data.categoryImageURL = 'https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029__340.jpg';
                break;
            case 'Milk, cheese, eggs and alternatives':
                data.categoryImageURL = 'https://image.shutterstock.com/image-photo/assorted-dairy-products-milk-yogurt-260nw-530162824.jpg';
                break;
            case 'Lean meats and poultry, fish and alternatives':
                data.categoryImageURL = 'https://t3.ftcdn.net/jpg/01/18/84/52/240_F_118845283_n9uWnb81tg8cG7Rf9y3McWT1DT1ZKTDx.jpg';
                break;
            default:
                break;
        }
        let headers = {
            headers: {},
            body: JSON.stringify(data)
        };

        return requester.put(url,headers);
    };

    const deleteRecipe = function (id){
        let url = `/appdata/${storage.appKey}/recipes/${id}`;
        let headers = {
            headers: {}
        };

        return requester.del(url,headers);
    };

    return {
        createRecipe,
        getAllRecipes,
        getRecipe,
        editRecipe,
        deleteRecipe,
    };
}();