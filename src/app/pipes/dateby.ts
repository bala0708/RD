import {Pipe, PipeTransform, Injectable} from "@angular/core";

@Pipe({
  name: "dateby"
})
export class DateByPipe {
  transform(value: any, args?: any): any {
        let newVal = value.sort((a: any, b: any) => {
            let date1 = new Date(a.dateOfMeeting);
            let date2 = new Date(b.dateOfMeeting);
            console.log(a.dateOfMeeting);
            if (date1 > date2) {
                return 1;
            } else if (date1 < date2) {
                return -1;
            } else {
                return 0;
            }
        });
        return newVal;
  }
}