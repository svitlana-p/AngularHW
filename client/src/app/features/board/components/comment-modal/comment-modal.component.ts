import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IComment } from 'src/app/models/comment.interface';
import { ITodo } from 'src/app/models/todo.interface';
import { PopupService } from 'src/app/core/services/popup.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { TodoService } from 'src/app/core/services/todo.service';

@Component({
  selector: 'app-comment-modal',
  templateUrl: './comment-modal.component.html',
  styleUrls: ['./comment-modal.component.css']
})
export class CommentModalComponent implements OnInit, OnDestroy {

  @Input() todo!: ITodo;

  comments:IComment[] = [];
  getCommentSub!: Subscription;
  postCommentSub!: Subscription;
  delCommentSub!: Subscription;

  boardId: string = this.route.snapshot.params.id;


  constructor(public popupService: PopupService,
    public todoService: TodoService,
    public route: ActivatedRoute,
    public spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    this.spinnerService.open()
    this.getCommentSub = this.todoService.getComments(this.boardId, this.todo._id).subscribe((comments) => {
      this.comments = comments;
      this.spinnerService.close()
    });
  }
  ngOnDestroy(): void {
    if (this.getCommentSub) this.getCommentSub.unsubscribe();
    if (this.postCommentSub) this.postCommentSub.unsubscribe();
    if (this.delCommentSub) this.delCommentSub.unsubscribe();
  }
  @ViewChild('form') form!: NgForm;
  submit() {
    if (!this.form.value.title) return
    this.spinnerService.open()
    this.postCommentSub = this.todoService.postComments(this.boardId, this.todo._id, this.form.value.title).subscribe((comment) => {
      this.comments = [...this.comments, comment]
      this.form.reset()
      this.spinnerService.close()
    });
  }
  deleteComment(comment: IComment) {
    this.spinnerService.open()
    this.delCommentSub = this.todoService.deleteComments(this.boardId, this.todo._id, comment).subscribe((comment) => {
      this.comments = this.comments.filter(el => el._id !== comment._id)
      this.spinnerService.close()
    });
  }

}