import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IComment } from 'src/app/shared/models/comment';

import { ITodo } from 'src/app/shared/models/todo';
import { PopupService } from 'src/app/shared/services/popup.service';
import { TodoService } from 'src/app/shared/services/todo.service';

@Component({
  selector: 'app-comment-modal',
  templateUrl: './comment-modal.component.html',
  styleUrls: ['./comment-modal.component.css']
})
export class CommentModalComponent implements OnInit {
  
  @Input() todo!: ITodo;

  form = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required
    ])
  })

  get title() {
    return this.form.controls.title as FormControl
  }
  constructor(public popupService: PopupService,
    public todoService: TodoService,
    public route: ActivatedRoute
  ) {
  }
  boardId: string = this.route.snapshot.params.id;
  ngOnInit(): void {
    this.todoService.getComments(this.boardId, this.todo._id).subscribe()

   }
  submit() {
     this.todoService.postComments(this.boardId, this.todo._id, this.title.value).subscribe(()=> this.popupService.close())
  }
  deleteComment(comment:IComment) {
    this.todoService.deleteComments(this.boardId, this.todo._id, comment).subscribe(()=> this.popupService.close())
  }


}