
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IBoard } from 'src/app/models/board';

import { DashboardService } from 'src/app/services/dashboard.service';
import { PopupService } from 'src/app/services/popup.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  term = '';
  editboard!: IBoard;
  popupButton!: string;
  dashboardSubscription!: Subscription;
  sortValue = '';
  sortDesc = '';
  constructor(public dashboardServise: DashboardService,
    public popupService: PopupService,
    public spinnerService: SpinnerService
  ) { }
  choosePopupEdit(board: IBoard): void {
    this.popupButton = 'edit';
    this.editboard = board;
  }
  choosePopupAdd(): void {
    this.popupButton = 'add';
  }

  onEdit(eventData: { popupButton: string, selectedBoard: IBoard }) {
    this.popupButton = eventData.popupButton
    this.editboard = eventData.selectedBoard
  }
  onFilter(eventData: { filterTerm: string }) {
    this.term = eventData.filterTerm
  }
  onSort(eventData: { sortValue: string, sortDirection: string }) {
    this.sortValue = eventData.sortValue
    this.sortDesc = eventData.sortDirection
  }
  ngOnInit(): void {
    this.spinnerService.open()
    this.dashboardSubscription = this.dashboardServise.getAll().subscribe(() => {
      this.spinnerService.close()
    })
  }

  ngOnDestroy(): void {
    this.dashboardServise.boardList = [];
    if (this.dashboardSubscription) this.dashboardSubscription.unsubscribe();
  }

}
