const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipe = require('./recipe');
const recipes = require('./recipes');
const types = require('./types');
const diet = require('./diet');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes', recipes);
router.use('/addrecipe', recipe);
router.use('/types', types);
router.use('/getdiets', diet);


module.exports = router;
