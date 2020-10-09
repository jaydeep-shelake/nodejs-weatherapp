console.log('heloo  hollla');

const fetchWeather ='/weather';

const searchBtn = document.getElementById('searchBtn');
const inputValue = document.getElementById('search');
const icon = document.querySelector('.icon')
const temprature = document.querySelector('.temp span');
const date = document.querySelector('.date');
const weatherConditon =document.querySelector('.condtion')

const months =["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
date.textContent=new Date().getDate()+','+ months[new Date().getMonth()]

searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    temprature.textContent=`Loading....`;
    weatherConditon.innerHTML='';

    console.log(inputValue.value);

    const locationUrl = fetchWeather+`?address=`+inputValue.value;

    fetch(locationUrl)
    .then((res)=>{
       return res.json()
    
    })
    .then((data)=>{
        if(data.error){
           temprature.textContent=data.error;
           weatherConditon.innerHTML='';
        }
        else{
         const discription=data.discription;
         if(discription=='haze' || discription=='smoke' || discription=='fog' || discription=='mist'){
             icon.innerHTML=`<i class="far fa-sun-haze"></i>`;
         }
         else if(discription=='overcast clouds'){
             icon.innerHTML=`<i class="fal fa-clouds-sun"></i>`;
         }
         else if(discription=='clear sky'){
             icon.innerHTML=`<i class="far fa-sun"></i>`
         }
         else if(discription=='rain' || discription=='shower rain'){
             icon.innerHTML=`<i class="fal fa-cloud-showers-heavy"></i>`
         }
         else if(discription=='thunderstrom'){
             icon.innerHTML=`<i class="far fa-thunderstorm"></i>`
         }
         else if(discription=='snow'){
             icon.innerHTML=`<i class="far fa-snowflakes"></i>`
         }
           temprature.innerHTML=Math.ceil(data.temprature-273)+'&deg C';
           
           weatherConditon.innerHTML=data.discription+`<small>${data.cityName}</small>`;
        }
    })
    

})