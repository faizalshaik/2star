import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'NameSearchPipe', pure: false })
export class NameSearchPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    let searchText = new RegExp(args, 'ig');
    if (value) {
      return value.filter(obj => {
        if(obj==null || obj.name==null) return -1;
        return obj.name.search(searchText) !== -1;
      });
    }
  }
}