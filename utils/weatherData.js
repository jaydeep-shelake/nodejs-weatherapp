
//http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=850ee855ff939fea8f88736ee056e1fb
//http://api.openweathermap.org/data/2.5/weather?q=Karad,in&APPID=850ee855ff939fea8f88736ee056e1fb


const request = require('request');
const constants = require('../config');

const weatherData=(address,callback)=>{
    const url =constants.openWeatherMap.BASE_URL+encodeURIComponent(address)+'&APPID='+constants.openWeatherMap.SECRET_KEY;
    
   request({url,json:true},(error,{body})=>{
       console.log(body);
       if(error){
           callback("cant fetch data from map api",null);
       }
       else if(! body.main || !body.main.temp || !body.weather || !body.name){
             callback('enable to find require  data ',null)
       }
       else{
           callback(null,{
               temprature:body.main.temp,
               discription:body.weather[0].description,
               cityName:body.name
           });
       }
   });

    
}

module.exports=weatherData;