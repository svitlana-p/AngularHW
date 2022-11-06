
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IBoard } from 'src/app/shared/models/board';

import { DashboardService } from 'src/app/shared/services/dashboard.service';
import { PopupService } from 'src/app/shared/services/popup.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  term = '';
  editboard!: IBoard;
  popupButton!: boolean;
  dashboardSubscription!: Subscription;
  delBordSub!: Subscription;
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
  this.delBordSub = this.dashboardServise.delete(board._id).subscribe()
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
  
  ngOnDestroy(): void {
    this.dashboardServise.boardList = [];
    if (this.dashboardSubscription) this.dashboardSubscription.unsubscribe();
    if (this.delBordSub) this.delBordSub.unsubscribe();
  }
  
}
