const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./routes/AuthRouter');
const places = require("./routes/places");
const travelRouter = require('./routes/travel');


require('./db');
require("dotenv").config();
app.use(cors());
// app.use(
//     cors({
//         origin:[
//             "http://localhost:5174",
//             "https://smart-travel-planner-with-ai-83rj.onrender.com",
//             "https://smarttravelai.netlify.app/"
//         ],
        
//     })
// )
app.use(express.json());
app.use(places);



app.get("/", (req,res) =>{
    res.send("server is running");
})

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/travel', travelRouter); 

const port = process.env.PORT || 5000;



app.listen(port,() =>{
    console.log(`server is running ${port}`)
});
