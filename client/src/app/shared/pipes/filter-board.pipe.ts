import { Pipe, PipeTransform } from '@angular/core';
import { Board } from '../models/board';

@Pipe({
  name: 'filterBoard'
})
export class FilterBoardPipe implements PipeTransform {

  transform(boardList: Board[], search:string): Board[]{
    if(search.length === 0) return boardList
    return boardList.filter(el => el.name.toLowerCase().includes(search.toLowerCase()))
  }

}
