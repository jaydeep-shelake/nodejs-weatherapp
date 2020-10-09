const express = require('express');
const hbs = require('hbs');
const path = require('path');
const app = express();
const weatherData = require('../utils/weatherData');
const port = process.env.PORT || 3000;
const publicStaticDirPath=path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partial');

app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialPath);
app.use(express.static(publicStaticDirPath));
//default end
app.get('',(req,res)=>{
    res.statusCode=200;
    
    res.render('index',{
        title:'Weather app',
    })
});

app.get('/weather',(req,res)=>{
    res.statusCode=200;
    const address =req.query.address;

    if(!address){
        return res.send({error:"you must enter adress in search text box"});
    }
    weatherData(address,(error,{temprature,discription,cityName}={})=>{
        if(error){
            return res.send({error})
        }
        console.log(temprature,discription,cityName);
        res.send({
            temprature,
            discription,
            cityName
        })
    });
});

app.get("*",(req,res)=>{
    res.statusCode=404;
    res.setHeader('Conntent-Type','application/json');
    res.render('404',{
        title:'Page not found 404'
    })
});

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);
});