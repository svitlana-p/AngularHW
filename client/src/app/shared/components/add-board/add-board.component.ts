import { Component, OnDestroy, ChangeDetectionStrategy  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
import { PopupService } from 'src/app/shared/services/popup.service';
@Component({
  selector: 'app-add-board',
  templateUrl: './add-board.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./add-board.component.css']
})
export class AddBoardComponent implements OnDestroy {
  bordSubscritpion!: Subscription;
  form = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required
    ]),
    description: new FormControl<string>('', [
      Validators.required
    ])
  })

  get name() {
    return this.form.controls.name as FormControl
  }
  get description() {
    return this.form.controls.description as FormControl
  }
  constructor(public popupService: PopupService,
              public dashboardService: DashboardService
    ) { }
  submit(){
    this.form.disable()
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
      this.popupService.close()})
  }
  ngOnDestroy(): void {
    if (this.bordSubscritpion) this.bordSubscritpion.unsubscribe()
  }
}
