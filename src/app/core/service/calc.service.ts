import { Injectable, ComponentFactoryResolver } from '@angular/core';
import {Config} from '../Config';
import {Country, FootBallFixture, LeagueData, DayEvents, OptionGroup, GameData} from '../model';

@Injectable({
  providedIn: 'root'
})
export class CalcService {

  constructor() {
  }
  

	private calcLines(under, events)
	{
		let val =1 ;
		let division = 1;
		for(let i=0; i<under; i++)
		{
			val = val * (events - i);
			division = division * (i + 1);
		}
		let lines = val / division;
		return lines; 
  }


	combination(output, arr, index, n, r, target)
	{
		if(r == 0)
		{
      let newEntry = [];
      for(let i=0; i<index; i++)
        newEntry.push(arr[i]);
			output.push(newEntry);
    }    
		else if (target == n) 
		{
			return output;
		}
		else {
			arr[index] = target;
			this.combination(output, arr, index + 1, n, r - 1, target + 1);
			this.combination(output, arr, index, n, r, target + 1);
		}
		return output;
  }
  
	calcPrizeSum(games: GameData[], under: number, events: number)
	{
    let combines = [];
    let arr = [];
    for(let i=0; i< events; i++)
      arr.push(0);
		this.combination(combines, arr, 0, events, under, 0);
		
    let pzSum = 0;
    combines.forEach(idxs =>{
      let val = 1;
      idxs.forEach(idx => {
        let x: number = Number(games[idx].value);
        val = val * x;
      });      
			pzSum = pzSum + val;
    });
		return pzSum;
  }
    
    
  public calc_win(gamedatas: GameData[], amount:number, under: number)
  {
    let lines = this.calcLines(under, gamedatas.length);
    let apl = amount / lines;

    let gameNos = [];
    for(let i=0; i<gamedatas.length; i++)
      gameNos.push(i + 1);

    let prize_sum = this.calcPrizeSum(gamedatas, under,  gamedatas.length);

    let win = apl * prize_sum;
    return {apl: Math.round(apl * 100) / 100, win:  Math.round(win * 100) / 100} ; 
  }

}
