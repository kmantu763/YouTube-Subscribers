const express = require('express');
const app = express();

const SubscriberModel = require('../src/models/subscribers');
const mongoose = require('mongoose');


// get subscribers list
app.get('/subscribers', async (req, res)=>{
    let Subscribers = await SubscriberModel.find()
    
    res.json(Subscribers);
})


//get subscribers list only with name and subscribedChannel
app.get('/subscribers/names', async (req, res) => {

    let Subscribers = await SubscriberModel.aggregate([]).project(
        {
            '_id' : 0,
            'subscribedDate' : 0,
            '__v' : 0
        }
    )
    res.json(Subscribers)
    
})


// get the details of subscriber by subscriber's id 
app.get('/subscribers/:id', async (req, res) => {
    let id = new mongoose.Types.ObjectId(req.query.id);
    await SubscriberModel.findById(id, function (err, data) {
        if (!data){
            let error = {
                message : ` id:${id} not found in database `
            }
           res.status(400).json(error);
        }
        else{
            res.json(data);
        }
    })
    
})



module.exports = app;