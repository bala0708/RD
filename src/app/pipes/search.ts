import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name : 'SearchPipe',
})
export class SearchPipe implements PipeTransform {
    transform(value: any, input: string) {
        if (input) {
            input = input.toLowerCase();
            return value.filter(function (el : any) {
                var newData = el.topic.topic_title;
                return newData.toString().toLowerCase().indexOf(input.toLowerCase()) > -1
            })
        }
        return value;
    }
}
