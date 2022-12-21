import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IBoard } from 'src/app/models/board.interface';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { PopupService } from 'src/app/core/services/popup.service';

@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.css']
})
export class DashboardItemComponent {
  @Input() board!: IBoard;
  @Output() popupButtonSelected = new EventEmitter<{ popupButton: string, selectedBoard: IBoard }>()
  @Output() deleteBoard = new EventEmitter<{boardId:string}>()

  popupButton!: string;
  selectedBoard!: IBoard;

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
    this.deleteBoard.emit({boardId:board._id})
  }
}
