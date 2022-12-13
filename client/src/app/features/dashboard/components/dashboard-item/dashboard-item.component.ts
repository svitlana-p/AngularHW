import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { IBoard } from 'src/app/models/board.interface';
import { Subscription } from 'rxjs';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { PopupService } from 'src/app/core/services/popup.service';

@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.css']
})
export class DashboardItemComponent implements OnDestroy {
  @Input() board!: IBoard;
  @Output() popupButtonSelected = new EventEmitter<{ popupButton: string, selectedBoard: IBoard }>()

  popupButton!: string;
  selectedBoard!: IBoard;

  delSubscription!: Subscription;

  constructor(public dashboardService: DashboardService,
    public popupService: PopupService
  ) { }
  
  ngOnDestroy(): void {
    if (this.delSubscription) this.delSubscription.unsubscribe()
  }

  choosePopupEdit(board: IBoard): void {
    this.popupButton = 'edit';
    this.selectedBoard = board;
    this.popupButtonSelected.emit({ popupButton: this.popupButton, selectedBoard: board })
  }
  delete(board: IBoard): void {
    this.popupButton = 'delete'
    this.delSubscription = this.dashboardService.delete(board._id).subscribe()

  }
}
