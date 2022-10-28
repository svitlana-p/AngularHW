import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
import { PopupService } from 'src/app/shared/services/popup.service';
@Component({
  selector: 'app-add-board',
  templateUrl: './add-board.component.html',
  styleUrls: ['./add-board.component.css']
})
export class AddBoardComponent implements OnInit {
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

  ngOnInit(): void {
  }
  submit(){
    this.dashboardService.create({
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
    }).subscribe(()=>{
      this.popupService.close()
    })
  }
}
