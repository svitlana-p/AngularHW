import { Component, Input, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ITodo } from 'src/app/models/todo.interface';
import { PopupService } from 'src/app/core/services/popup.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { TodoService } from 'src/app/core/services/todo.service';

@Component({
  selector: 'app-add-edit-todo',
  templateUrl: './add-edit-todo.component.html',
  styleUrls: ['./add-edit-todo.component.css']
})
export class AddEditTodoComponent implements OnDestroy {
  @Input() isAdd?: boolean;
  @Input() todo!: ITodo;
  todoSubscription!: Subscription;
  editSubscription!: Subscription;
  
  constructor(public popupService: PopupService,
    public todoService: TodoService,
    public route: ActivatedRoute,
    public spinnerService: SpinnerService
  ) { }

  ngOnDestroy(): void {
    if (this.todoSubscription) this.todoSubscription.unsubscribe();
    if (this.editSubscription) this.editSubscription.unsubscribe();
  }
  boardId: string = this.route.snapshot.params.id;
  form = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required
    ])
  })

  get name() {
    return this.form.controls.name as FormControl
  }
  submit() {
    this.spinnerService.open()
    this.form.disable()
    this.todoService.create(this.boardId, {
      name: this.form.value.name as string,
      userId: '',
      boardId: '',
      _id: '',
      created: true,
      inProgress: false,
      completed: false,
      archive: false,
      createdAt: '',
      updatedAt: '',
      __v: NaN
    }).subscribe(() => {
      this.spinnerService.close()
      this.popupService.close()
    })
  }
  edit(todo: ITodo) {
    this.spinnerService.open()
    this.form.disable()
    this.todoService.edit(this.boardId, {
      name: this.form.value.name as string,
      userId: todo.userId,
      boardId: todo.boardId,
      _id: todo._id,
      created: todo.created,
      inProgress: todo.inProgress,
      completed: todo.completed,
      archive: todo.archive,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
      __v: todo.__v

    }).subscribe(() => {
      this.spinnerService.close()
      this.popupService.close()
    })
  }
  

}
