import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'speedUnit'
})

export class SpeedUnitPipe implements PipeTransform {
    transform(speed: number, unitType: string): string{
        switch(unitType){
            case "kph":
            const miles = speed * 1.6;
            return miles + " kph";

            default:
            return speed + " mph";

        }
    }
}