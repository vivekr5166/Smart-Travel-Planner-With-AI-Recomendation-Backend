const mongoose = require('mongoose');

  const placeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique:true },            
  city: { type: String },                            
  description: { type: String },                    
  image: { type: String },                          
  rating: { type: Number, default: 0 },             
  tags: [String]                                     
});

const TuristPlaceSchema = new mongoose.Schema({
  state: { type: String, default: "Bihar" },       
  places: [placeSchema]                             
});


const  TuristPlace = mongoose.model("TuristPlace",  placeSchema);

module.exports =  TuristPlace;