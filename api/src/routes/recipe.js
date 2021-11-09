const { Router } = require('express');
const { Recipe, Diet } = require('../db');

const router = Router();

router.post('/', async (req, res, next)=>{
    try {
        const {name, description, score, healthy, howto, diet, vegetarian, vegan, glutenfree, dairyfree, img} = req.body;
        const newRecipe = await Recipe.create({
            name,
            description,
            score,
            healthy,
            howto,
            diet,
            vegetarian,
            vegan,
            glutenfree,
            dairyfree,
            img
        })

        const newDiet = await Diet.findAll({
            where: {
                name: diet
            }
        })

        newRecipe.addDiets(newDiet);

        res.send(newRecipe);
    } catch (error) {
        next(error)
    }
});

module.exports = router;
