import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IBoard } from 'src/app/models/board.interface';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { PopupService } from 'src/app/core/services/popup.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  editboard!: IBoard;
  popupButton!: string;
  dashboardSubscription!: Subscription;
  dashboardAddSubscription!: Subscription;
  dashboardEditSubscription!: Subscription;
  dashboardDelSubscription!: Subscription;
  boardList: IBoard[] = [];
  boardListFiltered: IBoard[] = [];

  constructor(public dashboardServise: DashboardService,
    public popupService: PopupService,
    public spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    this.spinnerService.open()
    this.dashboardSubscription = this.dashboardServise.getAll().subscribe((boards) => {
      this.boardList = boards;
      this.boardListFiltered = boards;
      this.spinnerService.close()
    })
  }

  ngOnDestroy(): void {
    if (this.dashboardSubscription) this.dashboardSubscription.unsubscribe();
    if (this.dashboardAddSubscription) this.dashboardAddSubscription.unsubscribe();
    if (this.dashboardEditSubscription) this.dashboardEditSubscription.unsubscribe();
    if (this.dashboardDelSubscription) this.dashboardDelSubscription.unsubscribe();
  }

  choosePopup(): void {
    this.popupButton = 'add';
  }
  onBoardAdd(eventData: { board: IBoard }): void {
    this.dashboardAddSubscription = this.dashboardServise.create(eventData.board).subscribe(board => {
      this.boardList = [...this.boardList, board];
      this.boardListFiltered = [...this.boardListFiltered, board];
    })
  }
  onBoardEdit(eventData: { board: IBoard }): void {
    this.dashboardEditSubscription = this.dashboardServise.edit(eventData.board).subscribe(board => {
      this.boardList = this.boardList.filter(el => el._id !== board._id);
      this.boardList = [...this.boardList, board];
      this.boardListFiltered = this.boardListFiltered.filter(el => el._id !== board._id);
      this.boardListFiltered = [...this.boardListFiltered, board];
    })
  }
  onBoardDelete(eventData: { boardId: string }): void {
    this.dashboardDelSubscription = this.dashboardServise.delete(eventData.boardId).subscribe((boards: IBoard[]) => this.boardList = boards)
  }
  onEdit(eventData: { popupButton: string, selectedBoard: IBoard }) {
    this.popupButton = eventData.popupButton
    this.editboard = eventData.selectedBoard
  }
  onFilter(eventData: { filterTerm: string }) {
    this.boardListFiltered = this.dashboardServise.filter(eventData.filterTerm, this.boardList);
  }
  onSort(eventData: { sortValue: string, sortDirection: string }) {
    this.boardListFiltered = this.dashboardServise.sort(eventData.sortValue, eventData.sortDirection, this.boardListFiltered);
  }
}
