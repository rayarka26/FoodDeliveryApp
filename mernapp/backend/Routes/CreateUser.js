const express = require('express');
const router = express.Router();
const user = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtsecret = "qwerttyuiissbhgshsbbajajkakaksbshshyshshshshs";
router.post("/createuser",
body('email').isEmail(),
body('name').isLength({ min: 5 }),
  body('password','incorrect password').isLength({ min: 5 }),async(req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let secpassword = await bcrypt.hash(req.body.password,salt);
    try{
        await user.create({
            name: req.body.name,
            password : secpassword,
            email: req.body.email,
            location: req.body.location,
        })
    res.json({success:true});
    }catch(err){
        console.log(err);
        res.json({success:false});
    }
})

router.post("/loginuser",body('email').isEmail(),
  body('password','incorrect password').isLength({ min: 5 }),async(req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  let email = req.body.email;
    try{
        let userdata = await user.findOne({email});
        if(!userdata){
          return res.status(400).json({ errors: "try Login with correct credentials" });
        }
        const pwdcmp = await bcrypt.compare(req.body.password,userdata.password)
      if(!pwdcmp){
        return res.status(400).json({ errors: "try Login with correct credentials" });
      }
      const data = {
        user:{
          id:userdata.id
        }
      }
      const authToken = jwt.sign(data,jwtsecret);
      return res.json({success:true, authToken:authToken});
    }catch(err){
        console.log(err);
        res.json({success:false});
    }
})


module.exports = router;