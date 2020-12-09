import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'LoginSearchPipe', pure: false })
export class LoginSearchPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    let searchText = new RegExp(args, 'ig');
    if (value) {
      return value.filter(obj => {
        if(obj==null || obj.login==null) return -1;
        return obj.login.search(searchText) !== -1;
      });
    }
  }
}