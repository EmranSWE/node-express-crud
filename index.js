const express = require('express');
const cors = require ('cors');
const userRoutes = require('./routes/v1/randomUser.routes');
const app = express();
const port = 5000;

//Middleware
app.use(express.json());
app.use(cors())
app.use('/api/v1/get/',userRoutes)
app.get("/",(req,res)=>{
    res.send("Server is running")
});

app.listen(port,()=>{
    console.log('Running')
})