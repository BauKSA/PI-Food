const { Router } = require('express');
const axios = require('axios');
const {API_KEY} = process.env;

const router = Router();

router.get('/:diet', (req, res, next)=>{
    let diet = req.params.diet;
    axios.get(`https://api.spoonacular.com/recipes/complexSearch?diet=${diet}&number=100&addRecipeInformation=true&apiKey=${API_KEY}`)
    .then((response)=>{
        res.send(response.data.results);
    })
        // let minRecipeApi = [];
        // recipeApi.results.map((recipes)=>{
        //     let obj = {
        //         id: recipes.id,
        //         name: recipes.title,
        //         description: recipes.summary,
        //         score: recipes.spoonacularScore,
        //         healthy: recipes.healthScore,
        //         img: recipes.image
        //     }
        //     minRecipeApi.push(obj);
        // })
        // let allRecipes = [...minRecipeApi];
        // if(allRecipes.length > 0){
        //     res.send(allRecipes);
        // }else{
        //     res.send(diet);
        // }
    })

module.exports = router;
