import { boardMock } from 'src/app/mocks/board-mock-for-sort';
import { SortPipe } from './sort.pipe';

describe('SortPipe', () => {
  it('create an instance', () => {
    const pipe = new SortPipe();
    expect(pipe).toBeTruthy();
  });
});


  describe('Sort by name asc', ()=> {
    let pipe: SortPipe;

    beforeEach(()=>{
        pipe = new SortPipe;
        
    });
    
    it('should sort items by date in ascending order', ()=> {
        const query = ['createdAt', 'asc'];
        expect(pipe.transform(boardMock, query)).toEqual([           
            {
                "_id": "6332bd2fe83f1322eb37ff10",
                "name": "work",
                "description": "something to do",
                "userId": "6330922db91aa12736ecdf26",
                "createdAt": "2022-09-27T09:06:55.116Z",
                "updatedAt": "2022-11-06T20:13:24.133Z",
                "firstColor": "#94f0d9",
                "secondColor": "#ffe6f2",
                "thirdColor": "#b2d25b",
                "__v": 0
            },
            {
                "_id": "6332bd3ce83f1322eb37ff12",
                "name": "Home",
                "description": "something to do",
                "userId": "6330922db91aa12736ecdf26",
                "createdAt": "2022-09-27T09:07:08.799Z",
                "updatedAt": "2022-10-31T18:14:14.195Z",
                "firstColor": "#b8a9bc",
                "secondColor": "#a787b5",
                "thirdColor": "#716090",
                "__v": 1
            },
            {
                "_id": "6332bd4fe83f1322eb37ff14",
                "name": "School",
                "description": "something to learn",
                "userId": "6330922db91aa12736ecdf26",
                "createdAt": "2022-09-27T09:07:27.282Z",
                "updatedAt": "2022-11-06T10:08:25.410Z",
                "firstColor": "",
                "secondColor": "",
                "thirdColor": "",
                "__v": 2
            },
        ])
    });
    
    

    it('should sort items by name from a to z', ()=> {
        const query = ['name', 'asc'];
        expect(pipe.transform(boardMock, query)).toEqual(
            [           
            {
                "_id": "6332bd3ce83f1322eb37ff12",
                "name": "Home",
                "description": "something to do",
                "userId": "6330922db91aa12736ecdf26",
                "createdAt": "2022-09-27T09:07:08.799Z",
                "updatedAt": "2022-10-31T18:14:14.195Z",
                "firstColor": "#b8a9bc",
                "secondColor": "#a787b5",
                "thirdColor": "#716090",
                "__v": 1
            },
            {
                "_id": "6332bd4fe83f1322eb37ff14",
                "name": "School",
                "description": "something to learn",
                "userId": "6330922db91aa12736ecdf26",
                "createdAt": "2022-09-27T09:07:27.282Z",
                "updatedAt": "2022-11-06T10:08:25.410Z",
                "firstColor": "",
                "secondColor": "",
                "thirdColor": "",
                "__v": 2
            },
            {
                "_id": "6332bd2fe83f1322eb37ff10",
                "name": "work",
                "description": "something to do",
                "userId": "6330922db91aa12736ecdf26",
                "createdAt": "2022-09-27T09:06:55.116Z",
                "updatedAt": "2022-11-06T20:13:24.133Z",
                "firstColor": "#94f0d9",
                "secondColor": "#ffe6f2",
                "thirdColor": "#b2d25b",
                "__v": 0
            },
        ])
    });  
    it('should sort items by date in descending order', ()=> {
        const query = ['createdAt', 'desc'];
        expect(pipe.transform(boardMock, query)).toEqual([           
            {
                "_id": "6332bd4fe83f1322eb37ff14",
                "name": "School",
                "description": "something to learn",
                "userId": "6330922db91aa12736ecdf26",
                "createdAt": "2022-09-27T09:07:27.282Z",
                "updatedAt": "2022-11-06T10:08:25.410Z",
                "firstColor": "",
                "secondColor": "",
                "thirdColor": "",
                "__v": 2
            },
            {
                "_id": "6332bd3ce83f1322eb37ff12",
                "name": "Home",
                "description": "something to do",
                "userId": "6330922db91aa12736ecdf26",
                "createdAt": "2022-09-27T09:07:08.799Z",
                "updatedAt": "2022-10-31T18:14:14.195Z",
                "firstColor": "#b8a9bc",
                "secondColor": "#a787b5",
                "thirdColor": "#716090",
                "__v": 1
            },
            {
                "_id": "6332bd2fe83f1322eb37ff10",
                "name": "work",
                "description": "something to do",
                "userId": "6330922db91aa12736ecdf26",
                "createdAt": "2022-09-27T09:06:55.116Z",
                "updatedAt": "2022-11-06T20:13:24.133Z",
                "firstColor": "#94f0d9",
                "secondColor": "#ffe6f2",
                "thirdColor": "#b2d25b",
                "__v": 0
            },
        ])
    });
    

    it('should sort items by name from z to a', ()=> {
        const query = ['name', 'desc'];
        expect(pipe.transform(boardMock, query)).toEqual([
            {
                "_id": "6332bd2fe83f1322eb37ff10",
                "name": "work",
                "description": "something to do",
                "userId": "6330922db91aa12736ecdf26",
                "createdAt": "2022-09-27T09:06:55.116Z",
                "updatedAt": "2022-11-06T20:13:24.133Z",
                "firstColor": "#94f0d9",
                "secondColor": "#ffe6f2",
                "thirdColor": "#b2d25b",
                "__v": 0
            },
            {
                "_id": "6332bd4fe83f1322eb37ff14",
                "name": "School",
                "description": "something to learn",
                "userId": "6330922db91aa12736ecdf26",
                "createdAt": "2022-09-27T09:07:27.282Z",
                "updatedAt": "2022-11-06T10:08:25.410Z",
                "firstColor": "",
                "secondColor": "",
                "thirdColor": "",
                "__v": 2
            },
            {
                "_id": "6332bd3ce83f1322eb37ff12",
                "name": "Home",
                "description": "something to do",
                "userId": "6330922db91aa12736ecdf26",
                "createdAt": "2022-09-27T09:07:08.799Z",
                "updatedAt": "2022-10-31T18:14:14.195Z",
                "firstColor": "#b8a9bc",
                "secondColor": "#a787b5",
                "thirdColor": "#716090",
                "__v": 1
            },
        ])
    });         

    it('should return origin array in case of empty array', ()=> {
        const query = ['name', 'desc'];
        expect(pipe.transform([], query)).toEqual([])
    });

});
