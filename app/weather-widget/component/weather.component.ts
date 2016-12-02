import { Component } from '@angular/core';

import { WeatherService } from '../service/weather.service';

@Component({
    moduleId: module.id,
    selector: 'weather-widget',
    templateUrl: 'weather.component.html',
    styleUrls: ['weather.component.css'],
    providers: [ WeatherService ]
})

export class WeatherComponent{ 
    constructor(private service: WeatherService){
        this.service.getCurrentLocation();
        this.service.getCurrentWeather(45.68944,-122.58290)
        .subscribe(weather => console.log(weather), 
        err => console.error(err)
        );
        
    }
}