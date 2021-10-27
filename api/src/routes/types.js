const { Router } = require('express');
const { Diet } = require('../db');

const router = Router();

router.get('/', (req, res, next)=>{
    Diet.findAll()
    .then((types)=>{
        names = types.map((type)=>{
            return(type.name);
        })
        res.send(names);
    })
    .catch((error)=>{
        next(error);
    })
});

module.exports = router;
