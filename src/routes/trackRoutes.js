const express = require('express');
const { send } = require('express/lib/response');
const mongoose = require('mongoose');
const requestAuth = require('../middlewares/requestAuth');

const router = express.Router()
const Track = mongoose.model('Track')

router.use(requestAuth);

router.get('/tracks',async (req,res)=>{
    try{
        const tracks = await Track.find({userId:req.user._id})
        res.send(tracks);
    }
    catch(err)
    {
        res.status(422).send("Unable to fetch tracks:")
    }
});

router.post('/tracks', async (req,res)=>{
    
    const {name,locations} = req.body;
    if(!name || !locations)
    {
        return res.status(422).send({error:"You shoud provide a name and locations"})
    }
    try
    {
        const track = new Track({name,locations,userId:req.user._id})
        await track.save()
        res.send(track);
    }
    catch(err)
    {
        res.status(422).send({error:err.message});
    }
})

module.exports = router;

