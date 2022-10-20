import { Pipe, PipeTransform } from '@angular/core';
import { IBoard } from '../models/board';

@Pipe({
  name: 'filterBoard'
})
export class FilterBoardPipe implements PipeTransform {

  transform<T>(boardList: T[], search:string): T[]{
    if(search.length === 0) return boardList
    //@ts-ignore
    return boardList.filter(el => el.name.toLowerCase().includes(search.toLowerCase()))
  }

}
