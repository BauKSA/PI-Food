const { Router } = require('express');
const axios = require('axios');
const {API_KEY} = process.env;
const { Diet } = require('../db');


const router = Router();



router.get('/', async(req, res, next)=>{
        let diets = await Diet.findAll()
        console.log(diets);
        let dietNames = [];
        diets.map((diet)=>{
            dietNames.push(diet.name);
        })
        res.send(dietNames);
    })

module.exports = router;
