import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  filterTerm: string = '';
  sortValue: string = '';
  sortDirection: string = '';
  user!: string | null;
  dashboardSubscrition!: Subscription;

  @Input() title!: string;
  @Input() dellBtn!: boolean;
  @Output() filterBoards = new EventEmitter<{ filterTerm: string }>()
  @Output() sortBoards = new EventEmitter<{ sortValue: string, sortDirection: string }>()

  constructor(public dashboardService: DashboardService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  onFilter() {
    this.filterBoards.emit({ filterTerm: this.filterTerm })
  }
  onSortDirection(value: string) {
    this.sortDirection = value;
  }
  onSort() {
    this.sortBoards.emit({ sortValue: this.sortValue, sortDirection: this.sortDirection })
  }
  onDelete() {
    const boardId: string = this.route.snapshot.params.id;
    if(confirm('Are you sure you want to delete the board?')) {
      this.dashboardSubscrition = this.dashboardService.delete(boardId).subscribe(() => {
      this.router.navigate(['dashboard']);
    })
    }
    
  }

  ngOnInit(): void {
    this.user = localStorage.getItem('username')
  }

  ngOnDestroy(): void {
    if (this.dashboardSubscrition) this.dashboardSubscrition.unsubscribe()
  }
}
