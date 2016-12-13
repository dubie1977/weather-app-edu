import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'speedUnit'
})

export class SpeedUnitPipe implements PipeTransform {
    transform(speed: number, unitType: string): string {
        if (speed != null) {
            switch (unitType) {
                case "kph":
                    const miles = speed * 1.6;
                    return miles.toFixed(0) + " kph";

                default:
                    console.log("Speed: " + speed);
                    return speed.toFixed(0) + " mph";

            }
        } else{
            return speed+"";
        }
    }
}