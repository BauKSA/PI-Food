const { Router } = require('express');
const { Recipe } = require('../db');

const router = Router();

router.post('/', async (req, res, next)=>{
    const {name, description, score, healthy, howto} = req.body;
    const newRecipe = await Recipe.create({
        name,
        description,
        score,
        healthy,
        howto
    })
    res.end(JSON.stringify(newRecipe));
});

module.exports = router;
