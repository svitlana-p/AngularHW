import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IBoard } from 'src/app/models/i-board';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { PopupService } from 'src/app/core/services/popup.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
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
  ngOnInit(): void {
    this.spinnerService.open()
    this.dashboardSubscription = this.dashboardServise.getAll().subscribe(() => {
      this.spinnerService.close()
    })
  }

  ngOnDestroy(): void {
    this.dashboardServise.clear();
    if (this.dashboardSubscription) this.dashboardSubscription.unsubscribe();
  }

  choosePopup(): void {
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
}
