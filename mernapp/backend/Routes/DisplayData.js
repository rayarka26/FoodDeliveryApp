const express = require('express');
const router = express.Router();

router.post("/foodData",(req, res)=>{
    try{
    
        res.send([global.fooditems, global.foodcategory]);
    }catch(err){
        console.log(err);
        res.send("server eroor");
    }
})
module.exports = router;