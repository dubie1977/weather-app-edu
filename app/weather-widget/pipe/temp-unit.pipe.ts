import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'tempUnit'
})

export class TempUnitPipe implements PipeTransform {
    transform(temp: number, unitType: string): number{
        let deg = String.fromCharCode(176)

        switch(unitType){
            case "C":
            const fahrenhight = (temp - 32) * 5/9;
            return fahrenhight;

            default:
            return temp;

        }
    }
}