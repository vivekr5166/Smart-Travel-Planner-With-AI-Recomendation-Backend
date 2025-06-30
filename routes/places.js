const express = require("express");
const userSearch = require('../model/userSearch');
const TuristPlace = require("../model/TuristPlace")
const places = new express.Router();


places.post("/testListing", async (req, res) => {
 try{
   const { destination, number_of_people, days, travel_type } = req.body
   const sampleuserSearch = new userSearch(req.body);
   await sampleuserSearch.save();
 
  res.send("successful testing");
}catch(err){
    res.status(400).json({message:"Data Cannot be saved"})
  }
});

places.post("/feed", async (req, res) => {
   
 try{
   const { name, city,   description,                    
   image, rating, tags } = req.body
   const feedData = new TuristPlace(req.body);
   await feedData.save();
 
  res.send("successful testing");
}catch(err){
    res.status(400).json({message:"Data Cannot be saved"})
  }
});

places.get("/get-feed", async (req, res) => {
   
 try{
   const data = await TuristPlace.find({});
 
  res.status(200).json({data: data})
}catch(err){
    res.status(400).json({message:"Data Cannot be saved"})
  }
});

places.get("/get-feed/:id", async (req, res) => {  
 try{
   const _id = req.params.id;
   const data = await TuristPlace.findById({_id});
 
  res.status(200).json({data: data})
}catch(err){
    res.status(400).json({message:"Data Cannot be saved"})
  }
});

places.patch("/get-feed/:id", async (req, res) => {  
 try{
   const _id = req.params.id;
   const data = await TuristPlace.findByIdAndUpdate(_id,req.body,{
    new:true
   });
 
  res.status(200).json({data: data})
}catch(err){
    res.status(500).json({message:"Data Cannot be saved"})
  }
});

places.delete("/get-feed/:id", async (req, res) => {  
 try{
   const _id = req.params.id;
   const data = await TuristPlace.findByIdAndDelete(_id);
 
  res.status(200).json({data: data})
}catch(err){
    res.status(500).json({message:"Data Cannot be saved"})
  }
});

module.exports = places;