import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ITodo } from 'src/app/models/todo.interface';
import { PopupService } from 'src/app/core/services/popup.service';

@Component({
  selector: 'app-add-edit-todo',
  templateUrl: './add-edit-todo.component.html',
  styleUrls: ['./add-edit-todo.component.css']
})
export class AddEditTodoComponent {
  @Input() isAdd?: boolean;
  @Input() todo!: ITodo;

  @Output() addTask = new EventEmitter<{todo: ITodo}>()
  @Output() editTask = new EventEmitter<{todo: ITodo}>()

  
  constructor(public popupService: PopupService,
    public route: ActivatedRoute
  ) { }

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
    this.form.disable()
    const task:ITodo = {
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
    }
    this.addTask.emit({todo:task}) 
    this.popupService.close()
  }
  edit(todo: ITodo) {
    this.form.disable()
    const task:ITodo = {
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
    }
    this.editTask.emit({todo:task})
    this.popupService.close()
  }  

}
