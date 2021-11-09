const { Router } = require('express');
const { Recipe } = require('../db');
const {Sequelize} = require('sequelize');
const axios = require('axios');
const {API_KEY} = process.env;

const router = Router();

router.get('', (req, res, next)=>{
    try {
        let name = req.query.name;
                if(name){
                    let recipeDb = Recipe.findAll(
                        {
                            where: {
                                name: {
                                    [Sequelize.Op.iLike]: '%' + name + '%'
                                }
                            }
                        }
                    );
                    let recipeApi = axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${name}&number=100&addRecipeInformation=true`);
                    Promise.all([
                        recipeDb,
                        recipeApi
                    ])
                    .then((response)=>{
                        /*RESULTADOS EN <recipeApi.data.results>*/
                        var [recipeDb, recipeApi] = response;
                        let minRecipeApi = [];
                        recipeApi.data.results.map((recipes)=>{
                            let obj = {
                                id: recipes.id,
                                name: recipes.title,
                                score: recipes.spoonacularScore,
                                img: recipes.image,
                                vegetarian: recipes.vegetarian,
                                vegan: recipes.vegan,
                                glutenfree: recipes.glutenFree,
                                dairyfree: recipes.dairyFree
                            }
                            minRecipeApi.push(obj);
                        })
                        let allRecipes = [...recipeDb, ...minRecipeApi];
                        if(allRecipes.length > 0){
                            res.send(allRecipes);
                        }else{
                            res.send(false);
                        }
                    })
                }else{
                    /*MOSTRAR TODOS LOS RESULTADOS*/
                    let recipeDb = Recipe.findAll();
                    let recipeApi = axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`);
                    Promise.all([
                        recipeDb,
                        recipeApi
                    ])
                    .then((response)=>{
                        var [recipeDb, recipeApi] = response;
                        let minRecipeApi = [];
                        recipeApi.data.results.map((recipes)=>{
                            let obj = {
                                id: recipes.id,
                                name: recipes.title,
                                score: recipes.spoonacularScore,
                                img: recipes.image,
                                vegetarian: recipes.vegetarian,
                                vegan: recipes.vegan,
                                glutenfree: recipes.glutenFree,
                                dairyfree: recipes.dairyFree
                            }
                            minRecipeApi.push(obj);
                        })
                        let allRecipes = [...recipeDb, ...minRecipeApi];
                        res.send(allRecipes);
                    })
                }
    } catch (error) {
        next(error)
    }
        
});

router.get('/:id', (req, res)=>{
    try {
        let recipeId = req.params.id;
        if(recipeId.length > 10){
            Recipe.findAll(
                {
                    where: {
                        id: recipeId
                    }
                }
            )
            .then((response)=>{
                console.log(response)
                res.send(response);
            })
        }else{
            axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`)
            .then((response)=>{
                let recipeApi = {
                    name: response.data.title,
                    description: response.data.summary,
                    score: response.data.spoonacularScore,
                    healthy: response.data.healthScore,
                    howto: response.data.instructions,
                    diet: response.data.diets,
                    img: response.data.image
                }
                console.log(recipeApi)
                res.send(recipeApi);
            })
        }
    } catch (error) {
        next(error)
    }
});

module.exports = router;
