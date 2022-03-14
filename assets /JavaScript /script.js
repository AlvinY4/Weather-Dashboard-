
var city=""; 
var sBtn = document.getElementById("search-btn");
var findCity = document.getElementById("search-city");
var currentCity = document.getElementById("current-city");
var currentTemp = document.getElementById("Temperature");
var currentWind = document.getElementById("Wind");
var currentHu = document.getElementById("Humidity");
var currentUv = document.getElementById("UV-Index");
var weatherIcon = document.getElementById("weather-icon");
var searchCity = []
 
function find(cities){
    for (var i=0; i<searchCity.length; i++){
        if(cities.toUpperCase()===searchCity[i]){
            return -1;
        }
    }
    return 1;
}

var APIKey="5dcde2bebb0da601b3379c500e085aa0";


var citySearch = function(event) {
    event.preventDefault();
    var name = findCity.value.trim();
    if (name) {
        getCityInfo(name);
        name.value = '';
    }else { 
        alert('please enter a city')
}
}; 

function getCityInfo(city) {
    console.log(city)
    var queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey; 
    $.ajax({
        url:queryURL,
        method:"GET", 
    }).then(function(response){
        console.log(response);
        var weathericon= response.weather[0].icon;
        var iconurl="https://openweathermap.org/img/wn/"+weathericon +"@2x.png";
        var date=new Date(response.dt*1000).toLocaleDateString();
        $(currentCity).html(response.name +"("+date+")" + "<img src="+iconurl+">");

        var tempFahrenheit = (response.main.temp - 273.15) * 1.80 + 32; 
        $(currentTemp).html((tempFahrenheit).toFixed(2)+"&#8457"); 

        $(currentHu).html(response.main.humidity+"%");

        var windSpeed = response.wind.speed;
        var speedMph = (windSpeed*2.237).toFixed(1); 
        $(currentWind).html(speedMph+"MPH");

        if(response.cod==200){
            searchCity = JSON.parse(localStorage.getItem("cityname"));
            console.log(searchCity); 
            if (searchCity==null){
                searchCity=[];
                searchCity.push(city.toUpperCase());
                localStorage.setItem("cityname",JSON.stringify(searchCity));
                searchedCities(city);
            } 
        }
        

    }); 

}

function fiveDay(){
    var queryforcastURL="https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey; 
    $.ajax({
        url:queryforcastURL,
        method:"GET"
    }).then(function(response){
        
        for (i=0;i<5;i++){
            var date= new Date((response.list[((i+1)*8)-1].dt)*1000).toLocaleDateString();
            var iconcode= response.list[((i+1)*8)-1].weather[0].icon;
            var iconurl="https://openweathermap.org/img/wn/"+iconcode+".png";
            var tempF= response.list[((i+1)*8)-1].main.temp;
            var tempFahrenheit=(((tempF-273.5)*1.80)+32).toFixed(2);
            var humidity= response.list[((i+1)*8)-1].main.humidity;
        
            $("#card-date"+i).html(date);
            $("#card-img"+i).html("<img src="+iconurl+">");
            $("#card-temp"+i).html(tempFahrenheit+"&#8457");
            $("#card-hum"+i).html(humidity+"%");
        }
        
    });
}





