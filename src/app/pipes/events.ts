import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name : 'SearchNamePipe',
})
export class SearchNamePipe implements PipeTransform {
    transform(value: any, input: string) {
        if (input) {
            input = input.toLowerCase();
            return value.filter(function (el : any) {
                var newData = {
                    user1 :el.user.firstName,
                    user2 :el.toUserid.firstName,
                    topic : el.topic.topic_title
                };
                console.log(newData);
                return newData.user1.toString().toLowerCase().indexOf(input.toLowerCase()) > -1
            })
        }
        return value;
    }
}