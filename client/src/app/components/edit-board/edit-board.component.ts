import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Board } from 'src/app/shared/models/board';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
import { PopupService } from 'src/app/shared/services/popup.service';

@Component({
  selector: 'app-edit-board',
  templateUrl: './edit-board.component.html',
  styleUrls: ['./edit-board.component.css']
})
export class EditBoardComponent implements OnInit {
  @Input() board!:Board;
  form = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required
    ])
  })

  get name() {
    return this.form.controls.name as FormControl
  }
  
  constructor(public popupService: PopupService,
              public dashboardService: DashboardService
    ) { }

  ngOnInit(): void {
  }
  edit(board:Board){
    this.dashboardService.edit({
      name: this.form.value.name as string,      
      description: board.description,
      _id: board._id,
      userId: board.userId,
      createdAt: board.createdAt,
      updatedAt: board.updatedAt,
      __v: board.__v
      
    }).subscribe(()=>{
      this.popupService.close()
    })
  }
}
