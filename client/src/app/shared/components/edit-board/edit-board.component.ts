import { Component, Input, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IBoard } from 'src/app/shared/models/board';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
import { PopupService } from 'src/app/shared/services/popup.service';

@Component({
  selector: 'app-edit-board',
  templateUrl: './edit-board.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./edit-board.component.css']
})
export class EditBoardComponent implements OnDestroy {
  @Input() board!:IBoard;
  editSubscritpion!: Subscription;
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

 
  edit(board:IBoard){
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
    }).subscribe(()=>{
      this.popupService.close()
    })
  }

  ngOnDestroy(): void {
    if(this.editSubscritpion) this.editSubscritpion.unsubscribe()
  }
}