
import { Component, Input, OnInit } from '@angular/core';
import { Board } from 'src/app/shared/models/board';

import { DashboardService } from 'src/app/shared/services/dashboard.service';
import { PopupService } from 'src/app/shared/services/popup.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {
  term = '';
  editboard!: Board;
  popupButton!: boolean;
  constructor(public dashboardServise: DashboardService, 
              public popupService: PopupService,
              
    ) { }
  choosePopupEdit(board: Board): void {
    this.popupButton = true;
    this.editboard = board;
  }
  choosePopupAdd(): void {
    this.popupButton = false;
  }
  ngOnInit(): void {
    this.dashboardServise.getAll().subscribe()
  }
  delete(board: Board): void{
    this.dashboardServise.delete(board).subscribe()
  }
}
