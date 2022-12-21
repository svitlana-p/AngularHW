import { ITodo } from "../../../models/todo.interface";

import { Observable, of } from 'rxjs';
import { todoMock } from "../../mocks/todo-mock";
import { IComment } from "../../../models/comment.interface";
import { CommentMock } from "../../mocks/comment-mock";

export class TodoserviceMock {
    getAll(boardId: string): Observable<ITodo[]> {
        return of(todoMock)
    }

    create(boardId: string, todo: ITodo): Observable<ITodo> {
        return of(todoMock[0])
    }

    edit(boardId: string, todo: ITodo): Observable<ITodo> {
        return of(todoMock[0])
    }

    delete(boardId: string, todo: ITodo): Observable<ITodo> {
        return of(todoMock[0])
    }

    changeStatus(boardId: string, todo: ITodo, action: string): Observable<ITodo> {
        return of(todoMock[0])
    }

    postComments(boardId: string, todo: ITodo, title: string): Observable<IComment> {
        return of(CommentMock[0])
    }

    getComments(boardId: string, todo: ITodo): Observable<IComment> {
        return of(CommentMock[0])
    }

    deleteComments(boardId: string, todo: ITodo, comment: IComment): Observable<IComment> {
        return of(CommentMock[0])
    }
    commentList: IComment[] = []
}