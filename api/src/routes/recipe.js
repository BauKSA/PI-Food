const { Router } = require('express');
const { Recipe, Diet } = require('../db');

const router = Router();

router.post('/', async (req, res, next)=>{
    const {name, description, score, healthy, howto, diets} = req.body;
    const newRecipe = await Recipe.create({
        name,
        description,
        score,
        healthy,
        howto,
        diets
    })

    const newDiet = await Diet.findAll({
        where: {
            name: diets
        }
    })

    newRecipe.addDiets(newDiet);

    res.send();
});

module.exports = router;
