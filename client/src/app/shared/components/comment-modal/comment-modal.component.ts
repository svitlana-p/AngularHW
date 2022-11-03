import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IComment } from 'src/app/shared/models/comment';

import { ITodo } from 'src/app/shared/models/todo';
import { PopupService } from 'src/app/shared/services/popup.service';
import { TodoService } from 'src/app/shared/services/todo.service';

@Component({
  selector: 'app-comment-modal',
  templateUrl: './comment-modal.component.html',
  styleUrls: ['./comment-modal.component.css']
})
export class CommentModalComponent implements OnInit, OnDestroy {

  @Input() todo!: ITodo;
  getCommentSub!: Subscription;
  postCommentSub!: Subscription;
  delCommentSub!: Subscription;
  boardId: string = this.route.snapshot.params.id;


  constructor(public popupService: PopupService,
    public todoService: TodoService,
    public route: ActivatedRoute) { }

  @ViewChild('form') form!: NgForm;

  ngOnInit(): void {
    this.getCommentSub = this.todoService.getComments(this.boardId, this.todo._id).subscribe();
  }
  submit() {
    this.postCommentSub = this.todoService.postComments(this.boardId, this.todo._id, this.form.value.title).subscribe(() => this.popupService.close());
  }
  deleteComment(comment: IComment) {
    this.delCommentSub = this.todoService.deleteComments(this.boardId, this.todo._id, comment).subscribe(() => this.popupService.close());
  }
  ngOnDestroy(): void {
    if (this.getCommentSub) this.getCommentSub.unsubscribe();
    if (this.postCommentSub) this.postCommentSub.unsubscribe();
    if (this.delCommentSub) this.delCommentSub.unsubscribe();
  }

}