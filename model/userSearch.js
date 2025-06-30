const mongoose = require('mongoose');

const userSearchSchema = new mongoose.Schema({

   destination:{
    type:String,
    required:true,
   },

   number_of_people:{
    type:Number,
    required:true,
   },

   days:{
    type:Number,
    required:true,
   },

   travel_type:{
    type:String,
   },

   optional:{
    type:String,
   }
});

const userSearch = mongoose.model("UserSearch", userSearchSchema);

module.exports = userSearch;