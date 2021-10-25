const { Router } = require('express');

const router = Router();

router.post('/', (req, res)=>{
    res.send("POST recipe");
});

module.exports = router;
