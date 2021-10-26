const { Router } = require('express');
const { Diet } = require('../db');

const router = Router();

router.get('/', (req, res, next)=>{
    Diet.findAll()
    .then((types)=>{
        res.send(types);
    })
    .catch((error)=>{
        next(error);
    })
});

module.exports = router;
