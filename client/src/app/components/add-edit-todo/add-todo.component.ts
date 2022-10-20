import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ITodo } from 'src/app/shared/models/todo';
import { PopupService } from 'src/app/shared/services/popup.service';
import { TodoService } from 'src/app/shared/services/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-edit-todo.component.html',
  styleUrls: ['./add-edit-todo.component.css']
})
export class AddEditTodoComponent implements OnInit {
  @Input() isAdd?: boolean;
  @Input() todo!: ITodo;

  form = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required
    ]) 
  })

  get name() {
    return this.form.controls.name as FormControl
  }
  constructor(public popupService: PopupService,
              public todoService: TodoService,
              public route: ActivatedRoute        
    ) {  
     }
  boardId: string =  this.route.snapshot.params.id;
  ngOnInit(): void {}
    submit(){
      
      this.todoService.create(this.boardId, {
        name: this.form.value.name as string,
        userId: '',
        boardId: '',
        _id: '',
        created: true,
        inProgress: false,
        completed: false,
        createdAt: '',
        updatedAt: '',
        __v: NaN
      }).subscribe(()=>{
        this.popupService.close()
      })
    }
  edit(todo:ITodo){
    this.todoService.edit(this.boardId, {
      name: this.form.value.name as string,      
      userId: todo.userId,
      boardId: todo.boardId,
      _id: todo._id,
      created: todo.created,
      inProgress: todo.inProgress,
      completed: todo.completed,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
      __v: todo.__v
      
    }).subscribe(()=>{
      this.popupService.close()
    })
  }
  

}
