import { Component, OnDestroy, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DashboardService } from 'src/app/core/dashboard.service';
import { PopupService } from 'src/app/core/popup.service';
import { IBoard } from '../../../models/board';
import { SpinnerService } from '../../../core/spinner.service';
@Component({
  selector: 'app-add-edit-board',
  templateUrl: './add-edit-board.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./add-edit-board.component.css']
})
export class AddEditBoardComponent implements OnDestroy {
  @Input() isAdd?: boolean;
  @Input() board!: IBoard;

  bordSubscritpion!: Subscription;
  editSubscritpion!: Subscription;
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
  constructor(public popupService: PopupService,
    public dashboardService: DashboardService,
    public spinnerService: SpinnerService
  ) { }
  submit() {
    this.form.disable()
    this.spinnerService.open()
    this.bordSubscritpion = this.dashboardService.create({
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
    }).subscribe(() => {
      this.spinnerService.close()
      this.popupService.close()
    })

  }

  edit(board: IBoard) {
    if (!this.isAdd) this.spinnerService.open()
    this.editSubscritpion = this.dashboardService.edit({
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
    }).subscribe(() => {
      this.popupService.close()
      this.spinnerService.close()
    })

  }


  ngOnDestroy(): void {
    if (this.bordSubscritpion) this.bordSubscritpion.unsubscribe()
    if (this.editSubscritpion) this.editSubscritpion.unsubscribe()
  }
}
