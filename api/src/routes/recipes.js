const { Router } = require('express');

const router = Router();

router.get('', (req, res)=>{
    let name = req.query.name;
    res.send(`GET ${name}`);
});

router.get('/:id', (req, res)=>{
    let id = req.params.id;
    res.send(`GET ${id}`);
});

module.exports = router;
