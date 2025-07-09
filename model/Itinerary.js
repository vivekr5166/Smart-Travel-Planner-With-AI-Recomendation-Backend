const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  time: { type: String },
  type: { type: String },
  description: { type: String },
  ticket_cost: { type: String }  
});

const daySchema = new mongoose.Schema({
  day: { type: String }, 
  places: [placeSchema],
  food: { type: String },
  approx_cost: { type: String }  
});

const itinerarySchema = new mongoose.Schema({
  // email: { type: String, required: true },
  venue: { type: String },
  day_count: { type: String }, 
  total_people: { type: Number },
  days: [daySchema],
  total_estimated_cost: { type: String } 
}, { timestamps: true });

const ItineraryModel = mongoose.model('Itinerary', itinerarySchema);
module.exports = ItineraryModel;
