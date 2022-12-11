import { boardMock } from 'src/app/testing/mocks/board-mock';
import { todoMock } from 'src/app/testing/mocks/todo-mock';
import { FilterBoardPipe } from './filter-board.pipe';

describe('FilterBoardPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterBoardPipe();
    expect(pipe).toBeTruthy();
  });
});

describe('filter by name', () => {
  let pipe: FilterBoardPipe;

  beforeEach(() => {
    pipe = new FilterBoardPipe();
  })

  it('should return item which contains "school" in board name', () => {
    const query = "school";
    expect(pipe.transform(boardMock, query)).toEqual([boardMock[2]]);
  });

  it('should return empty array', () => {
    const query = "gvghgtyu";
    expect(pipe.transform(boardMock, query)).toEqual([]);
  });

  it('should return origin array in case of empty query', () => {
    const query = "";
    expect(pipe.transform(boardMock, query)).toEqual(boardMock);
  });

})