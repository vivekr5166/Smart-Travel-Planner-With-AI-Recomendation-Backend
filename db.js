const mongoose = require('mongoose');
main()
.then(()=>{
    console.log("connection succsessfull");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://vivekkumar91937:qazxswedc@smart-travel-planner.iv7daqu.mongodb.net/');
}