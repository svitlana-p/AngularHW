import { Pipe, PipeTransform } from '@angular/core';
import { ITodo } from 'src/app/models/todo';

@Pipe({
  name: 'filterTodo'
})
export class FilterTodoPipe implements PipeTransform {

  transform(todoList: ITodo[], search: string): ITodo[] {
    if (search.length === 0) return todoList
    return todoList.filter(el => el.name.toLowerCase().includes(search.toLowerCase()))
  }

}

