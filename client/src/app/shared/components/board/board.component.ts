import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { IBoard } from 'src/app/models/board';
import { Subscription } from 'rxjs';
import { DashboardService } from 'src/app/core/dashboard.service';
import { PopupService } from 'src/app/core/popup.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnDestroy {
  @Input() board!: IBoard;
  @Output() popupButtonSelected = new EventEmitter<{ popupButton: string, selectedBoard: IBoard }>()

  popupButton!: string;
  selectedBoard!: IBoard;

  delSubscription!: Subscription;

  constructor(public dashboardService: DashboardService,
    public popupService: PopupService
  ) { }

  choosePopupEdit(board: IBoard): void {
    this.popupButton = 'edit';
    this.selectedBoard = board;
    this.popupButtonSelected.emit({ popupButton: this.popupButton, selectedBoard: board })
  }
  delete(board: IBoard): void {
    this.popupButton = 'delete'
    this.delSubscription = this.dashboardService.delete(board._id).subscribe()

  }

  ngOnDestroy(): void {
    if (this.delSubscription) this.delSubscription.unsubscribe()
  }

}
