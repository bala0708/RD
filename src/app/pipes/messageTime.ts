// import {Pipe, PipeTransform, Injectable, ChangeDetectorRef} from "@angular/core";
// import {Observable} from 'rxjs/Observable';
// import {AsyncPipe} from '@angular/common';

// @Pipe({
//     name: 'messageTime',
//     pure: false
// })
// export class MessageTimePipe extends AsyncPipe
// {
//     value:Date;
//     timer:Observable<string>;

//     constructor(ref:ChangeDetectorRef)
//     {
//         super(ref);
//     }

//     transform(obj:any, args?:any[]):any
//     {
//         if (obj instanceof Date)
//         {
//             this.value = obj;

//             if(!this.timer)
//             {
//                 this.timer = this.getObservable();
//             }

//             return super.transform(this.timer, args);
//         }

//         return super.transform(obj, args);
//     }

//     private getObservable()
//     {
//         return Observable.interval(1000).startWith(0).map(()=>
//         {
//             var result:string;
//             // current time
//             let now = new Date().getTime();

//             // time since message was sent in seconds
//             let delta = (now - this.value.getTime()) / 1000;

//             // format string
//             if (delta < 10)
//             {
//                 result = 'jetzt';
//             }
//             else if (delta < 60)
//             { // sent in last minute
//                 result = 'vor ' + Math.floor(delta) + ' Sekunden';
//             }
//             else if (delta < 3600)
//             { // sent in last hour
//                 result = 'vor ' + Math.floor(delta / 60) + ' Minuten';
//             }
//             else if (delta < 86400)
//             { // sent on last day
//                 result = 'vor ' + Math.floor(delta / 3600) + ' Stunden';
//             }
//             else
//             { // sent more than one day ago
//                 result = 'vor ' + Math.floor(delta / 86400) + ' Tagen';
//             }
//             return result;
//         });
//     };
// }