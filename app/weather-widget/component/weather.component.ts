import { Component, OnInit } from '@angular/core';

import { WeatherService } from '../service/weather.service';

import { Weather } from '../model/weather';

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
            this.pos = position
            this.getCurrentWeather()
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
                console.log("Weather: ", this.weatherData); //TODO REAMOVE
            }, 
            err => console.error(err));
    }
}