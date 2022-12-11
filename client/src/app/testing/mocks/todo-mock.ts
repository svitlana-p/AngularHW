import { ITodo } from "../../models/todo";

export const todoMock: ITodo[] = [
    {
        "_id": "635a384661dd61901832303c",
        "name": "archive tasks",
        "userId": "6330922db91aa12736ecdf26",
        "boardId": "6332bd2fe83f1322eb37ff10",
        "created": true,
        "inProgress": false,
        "completed": false,
        "createdAt": "2022-10-27T07:50:30.543Z",
        "updatedAt": "2022-11-07T13:29:02.846Z",
        "archive": true,
        "__v": 0
    },
    {
        "_id": "635a741f8bb8e194c73ad6ca",
        "name": "color for columns",
        "userId": "6330922db91aa12736ecdf26",
        "boardId": "6332bd2fe83f1322eb37ff10",
        "created": false,
        "inProgress": true,
        "completed": false,
        "archive": true,
        "createdAt": "2022-10-27T12:05:51.376Z",
        "updatedAt": "2022-11-07T13:29:04.344Z",
        "__v": 1
    },
    {
        "_id": "636783a879fa84b22d83ba56",
        "name": "deploy api to heroku",
        "userId": "6330922db91aa12736ecdf26",
        "boardId": "6332bd2fe83f1322eb37ff10",
        "created": false,
        "inProgress": false,
        "completed": true,
        "archive": false,
        "createdAt": "2022-11-06T09:51:36.538Z",
        "updatedAt": "2022-11-06T10:31:45.614Z",
        "__v": 2
    },
]