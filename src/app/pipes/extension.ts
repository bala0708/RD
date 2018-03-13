import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'extension' })

export class RemoveExtension implements PipeTransform {
  transform(item) {
   let x =  item.split(".");
   return x[1];
  }

}