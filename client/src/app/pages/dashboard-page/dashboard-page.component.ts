
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IBoard } from 'src/app/shared/models/board';

import { DashboardService } from 'src/app/shared/services/dashboard.service';
import { PopupService } from 'src/app/shared/services/popup.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {
  term = '';
  editboard!: IBoard;
  popupButton!: boolean;
  dashboardSubscription!: Subscription;
  sortValue = '';
  sortDesc = '';

  constructor(public dashboardServise: DashboardService, 
              public popupService: PopupService,
              
    ) { }
  choosePopupEdit(board: IBoard): void {
    this.popupButton = true;
    this.editboard = board;
  }
  choosePopupAdd(): void {
    this.popupButton = false;
  }
  delete(board: IBoard): void{
    this.dashboardServise.delete(board).subscribe()
  }
  onFilter(eventData: {filterTerm: string}){
    this.term = eventData.filterTerm
  }
  onSort(eventData:{sortValue: string, sortDirection: string}){
    this.sortValue = eventData.sortValue
    this.sortDesc = eventData.sortDirection
  }
  ngOnInit(): void {
    this.dashboardSubscription = this.dashboardServise.getAll().subscribe()
  }
  
  ngOnDestroy() {
    if (this.dashboardSubscription) this.dashboardSubscription.unsubscribe()
  }
  
}
