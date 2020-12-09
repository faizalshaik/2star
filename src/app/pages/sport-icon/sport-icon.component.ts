import { Component, OnInit, ViewChild, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-sport-icon',
  templateUrl: './sport-icon.component.html'
})

export class SportIconComponent{
  @Input() key: string;  
  constructor() { 
  }

  source()
  {
    return 'assets/img/sports/' + this.key + '.svg';
  }

}
