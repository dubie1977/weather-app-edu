import { Component, OnInit } from '@angular/core';

import { WeatherService } from '../service/weather.service';

import { Weather } from '../model/weather';

import { WEATHER_COLORS } from '../constants/constants';

declare var Skycons: any;

@Component({
    moduleId: module.id,
    selector: 'weather-widget',
    templateUrl: 'weather.component.html',
    styleUrls: ['weather.component.css'],
    providers: [ WeatherService ]
})

export class WeatherComponent implements OnInit{ 
    pos: Position;
    weatherData = new Weather(null, null, null, null, null);
    currentSpeedUnit = "mph";
    currentTempUnit = "F";
    currentLocation = "";
    icons = new Skycons({"color": "#FFF"});
    dataRecived = false;

    constructor(private service: WeatherService){}

    ngOnInit(){
        this.getCurrentLocation();
    }

    mesurementToggle(){
        if(this.currentTempUnit == "F"){
            this.currentTempUnit = "C";
            this.currentSpeedUnit = "kph";
        } else{
            this.currentTempUnit = "F";
            this.currentSpeedUnit = "mph";
        }
    }

    getCurrentLocation(){
        this.service.getCurrentLocation()
        .subscribe(position => {
            this.pos = position;
            this.getCurrentWeather();
            this.getLocationName();
        },
        err => console.error(err));
    }

    getCurrentWeather(){
        this.service.getCurrentWeather(this.pos.coords.latitude,this.pos.coords.longitude)
            .subscribe(weather => {
                this.weatherData.temp = weather["currently"]["temperature"],
                this.weatherData.summary = weather["currently"]["summary"],
                this.weatherData.wind = weather["currently"]["windSpeed"],
                this.weatherData.humidity = weather["currently"]["humidity"],
                this.weatherData.icon = weather["currently"]["icon"]
                console.log(this.weatherData)
                this.setIcon();
                this.dataRecived = true;
            }, 
            err => console.error(err));
    }

    getLocationName(){
        this.service.getLocationName(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe( location => {
                this.currentLocation = location["results"]["3"]["formatted_address"];
                console.log(this.currentLocation);
                console.log(location); //TODO remove
            })
    }

    setIcon(){
        this.icons.add("icon", this.weatherData.icon);
        this.icons.play();
    }

    setStyles(): Object{
        if(this.weatherData.icon){
            this.icons.color = WEATHER_COLORS[this.weatherData.icon]["color"];
            return WEATHER_COLORS[this.weatherData.icon];
        } else{
            this.icons.color = WEATHER_COLORS["default"]["color"];
            return WEATHER_COLORS["default"];

        }
    }
}