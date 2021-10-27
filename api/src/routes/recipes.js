const { Router } = require('express');
const { Recipe } = require('../db');
const {Sequelize} = require('sequelize');
const axios = require('axios');

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
        )
        let recipeApi = axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=18df499b8a534178a8e11de478496ebc&query=${name}&number=100`)
        Promise.all([
            recipeDb,
            recipeApi
        ])
        .then((response)=>{
            /*RESULTS ARE IN <recipeApi.data.results>*/
            var [recipeDb, recipeApi] = response;
            let allRecipes = [...recipeDb, ...recipeApi.data.results];
            if(allRecipes.length > 0){
                res.send(allRecipes);
            }else{
                res.send(`No hubo resultados para la busqueda ${name}`);
            }
        })
    }else{
        /*MOSTRAR TODOS LOS RESULTADOS*/
        let recipeDb = Recipe.findAll();
        let recipeApi = axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=18df499b8a534178a8e11de478496ebc&number=100`)
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
    if(id.length > 10){
        let filterRecipe;
        let recipeDb = Recipe.findAll(
            {
                where: {
                    id: recipeId
                }
            }
        )
        .then((response)=>{
            res.send(recipeDb);
        })
    }else{
        let recipeApi = axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=18df499b8a534178a8e11de478496ebc&id=${recipeId}`)
        .then((response)=>{
            res.send(recipeApi);
        })
    }
});

module.exports = router;
