const { Router } = require('express');
const { Recipe } = require('../db');
const {Sequelize} = require('sequelize');

const router = Router();

router.get('', (req, res, next)=>{
    let name = req.query.name;
    if(name){
        console.log(name);
        let recipeDb = Recipe.findAll(
            {
                where: {
                    name: {
                        [Sequelize.Op.iLike]: '%' + name + '%'
                    }
                }
            }
        )
        .then((response)=>{
            if(response.length < 1){
                res.send(`No se encontró ningún resultado para "${name}"`);
            }else if(response.length > 0){
                res.send(response);
            }
        })
    }
});

router.get('/:id', (req, res)=>{
    let id = req.params.id;
    res.send(`GET ${id}`);
});

module.exports = router;
