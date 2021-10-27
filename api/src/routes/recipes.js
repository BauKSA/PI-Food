const { Router } = require('express');
const { Recipe } = require('../db');
const {Sequelize} = require('sequelize');
const axios = require('axios');
const {API_KEY} = process.env;

const router = Router();

router.get('', (req, res, next)=>{
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
                    img: recipes.image
                }
                minRecipeApi.push(obj);
            })
            let allRecipes = [...recipeDb, ...minRecipeApi];
            if(allRecipes.length > 0){
                res.send(allRecipes);
            }else{
                res.send(name);
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
            let allRecipes = [...recipeDb, ...recipeApi.data.results];
            res.send(allRecipes);
        })
    }
    })

router.get('/:id', (req, res)=>{
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
            console.log(response.data);
            res.send(recipeApi);
        })
    }
});

module.exports = router;
