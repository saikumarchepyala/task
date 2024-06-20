const express = require('express');
const app = express();
app.use(express.json());
const cors =require('cors');
app.use(cors(
    {
        origin:["https://task-pz8b.vercel.app/"],
        methods:["POST", "GET"],
        credentials:true
    }
));
require('./db/connection');
const Users = require('./Models/User');

app.post ("/",async(req,res)=>{
    let user = new Users(req.body);
    let result = await user.save();
    res.send(result);
})

app.listen(4000);
