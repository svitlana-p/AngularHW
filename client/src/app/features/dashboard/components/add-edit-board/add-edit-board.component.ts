import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { PopupService } from 'src/app/core/services/popup.service';
import { IBoard } from 'src/app/models/board.interface';
@Component({
  selector: 'app-add-edit-board',
  templateUrl: './add-edit-board.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./add-edit-board.component.css']
})
export class AddEditBoardComponent {
  @Input() isAdd?: boolean;
  @Input() board!: IBoard;
  @Output() addBoard = new EventEmitter<{board:IBoard}>()
  @Output() editBoard = new EventEmitter<{board:IBoard}>()

  
  constructor(public popupService: PopupService,
    public dashboardService: DashboardService
  ) { }

  form = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required
    ]),
    description: new FormControl<string>('', [
      Validators.maxLength(60)
    ])
  })

  get name() {
    return this.form.controls.name as FormControl
  }
  get description() {
    return this.form.controls.description as FormControl
  }
  submit() {
    this.form.disable()
    const board = {
      name: this.form.value.name as string,
      description: this.form.value.description as string,
      userId: '',
      _id: '',
      createdAt: '',
      updatedAt: '',
      firstColor: '',
      secondColor: '',
      thirdColor: '',
      __v: 0
    }
    this.addBoard.emit({board:board})
    this.popupService.close()
  }

  edit(board: IBoard) {
    const newBoard = {
      name: this.form.value.name as string,
      description: board.description,
      _id: board._id,
      userId: board.userId,
      createdAt: board.createdAt,
      updatedAt: board.updatedAt,
      __v: board.__v,
      firstColor: '',
      secondColor: '',
      thirdColor: ''
    }
    this.editBoard.emit({board: newBoard})
    this.popupService.close()
  }
}
