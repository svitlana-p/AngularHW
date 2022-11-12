import { Pipe, PipeTransform } from '@angular/core';
import { IBoard } from 'src/app/models/board';

@Pipe({
  name: 'filterBoard'
})
export class FilterBoardPipe implements PipeTransform {

  transform(boardList: IBoard[], search:string): IBoard[]{
    if(search.length === 0) return boardList
    return boardList.filter(el => el.name.toLowerCase().includes(search.toLowerCase()))
  }

}
