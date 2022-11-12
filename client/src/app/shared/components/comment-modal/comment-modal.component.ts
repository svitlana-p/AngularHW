import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IComment } from 'src/app/models/comment';

import { ITodo } from 'src/app/models/todo';
import { PopupService } from 'src/app/services/popup.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { TodoService } from 'src/app/services/todo.service';

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
    public route: ActivatedRoute,
    public spinnerService: SpinnerService
    ) { }

  @ViewChild('form') form!: NgForm;

  ngOnInit(): void {
    this.spinnerService.open()
    this.getCommentSub = this.todoService.getComments(this.boardId, this.todo._id).subscribe(()=> {
      this.spinnerService.close()
    });
  }
  submit() {
    if(!this.form.value.title) return
    this.spinnerService.open()
    this.postCommentSub = this.todoService.postComments(this.boardId, this.todo._id, this.form.value.title).subscribe(()=>{
      this.form.reset() 
      this.spinnerService.close()
    });
  }
  deleteComment(comment: IComment) {
    this.spinnerService.open()
    this.delCommentSub = this.todoService.deleteComments(this.boardId, this.todo._id, comment).subscribe(()=> {
      this.spinnerService.close()
    });
  }
 
  ngOnDestroy(): void {
    this.todoService.commentList = [];
    if (this.getCommentSub) this.getCommentSub.unsubscribe();
    if (this.postCommentSub) this.postCommentSub.unsubscribe();
    if (this.delCommentSub) this.delCommentSub.unsubscribe();
  }

}