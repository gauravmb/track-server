const express = require('express');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const { send } = require('express/lib/response');

const User = mongoose.model('User')
const router = express.Router();

router.post('/signup', async (req,res)=>{    
    const {email,password} = req.body;
    const user = new User({email,password});
    try {
        await user.save();
        const token = jwt.sign({userId:user._id},"MY_SECRET_KEY")
        res.send({token})
        return;
    }
    catch(error){
       return res.status(422).send(error.message);
    }
});

router.post('/signin',async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password)
    {
       return res.status(422).send({error:'Enter Password or Email'});
    }

    const user = await User.findOne({email})
    if(!user)
    {
        return res.status(422).send({error:'Email ID Does not exits'});
    }

    try{
       await user.comparePassword(password);
       const token = jwt.sign({userId:user._id},'MY_SECRET_KEY');
       if(token)
       {
           return res.send({token});
       }
       else
       {
            return res.status(444).send("Invalid TOken");
       }
    }
    catch(err)
    {
        if(err)
        {
            return res.status(422).send({error:err.message});
        }
    }

});

module.exports = router;