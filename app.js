const express= require('express');
const morgan = require("morgan");
const fs= require("node:fs");
const data = require("./data/data.json");
const PORT = 5050;
const app =express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get('/main', (req, res) => {
    res.json({message: 'Welcome to the Hospital Data Server. To access data please append ,data, to the link'});
});

app.get('/database', (req, res) =>{
    fs.readFile("./data/data.json", "utf-8", (err, data) => {
        if (err){
          console.log(err);
        }else{
          res.send(JSON.parse(data));
          console.log(JSON.parse(data));
        }});
    });

app.post('/database', (req,res) =>{
    data.push(req.body);
    res.send(data);
    const newData=req.body;
    
    fs.writeFile("./data/data.json", JSON.stringify(data),(err)=>{
        if (err){
            console.log(err);
          }else{
            res.send('New Data Added to database');
            console.log(data);
        }});
})

app.delete('/database', (req,res) =>{
    data.pop();
    res.send(data);
    
    fs.writeFile("./data/data.json", JSON.stringify(data),(err)=>{
        if (err){
            console.log(err);
          }else{
            res.send('Data updated');
            console.log(data);
        }});
})

app.put('/database', (req,res) =>{
    const maxL=data.length-1;
    data[maxL]=req.body;
    res.send(data);
    
    fs.writeFile("./data/data.json", JSON.stringify(data),(err)=>{
        if (err){
            console.log(err);
          }else{
            res.send('Data deleted from database');
            console.log(data);
        }});
})



app.listen(PORT,() => {console.log(`Server is now listening on port ${PORT}`)});