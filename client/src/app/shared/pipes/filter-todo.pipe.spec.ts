import { todoMock } from 'src/app/mocks/todo-mock';
import { FilterTodoPipe } from './filter-todo.pipe';

describe('FilterTodoPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterTodoPipe();
    expect(pipe).toBeTruthy();
  });
});

describe('filter by name', ()=> {
    let pipe: FilterTodoPipe;

    beforeEach(()=> {
        pipe = new FilterTodoPipe();
    })


it('should return item which contains "deploy" in todo name', ()=> {
  const query = "tasks";
  expect(pipe.transform(todoMock, query)).toEqual([todoMock[0]]);
});

it('should return origin array in case of empty query', ()=> {
  const query = "";
  expect(pipe.transform(todoMock, query)).toEqual(todoMock);
});

it('should return empty array', ()=> {
  const query = "tyftuf";
  expect(pipe.transform(todoMock, query)).toEqual([]);
});

})