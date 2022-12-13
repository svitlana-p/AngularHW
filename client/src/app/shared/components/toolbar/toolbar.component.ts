import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  filterTerm: string = '';
  sortValue: string = '';
  sortDirection: string = '';
  user!: string | null;

  @Input() title!: string;
  @Input() dellBtn!: boolean;
  @Output() filterBoards = new EventEmitter<{ filterTerm: string }>()
  @Output() sortBoards = new EventEmitter<{ sortValue: string, sortDirection: string }>()
  @Output() deleteBoard = new EventEmitter<{}>()


  ngOnInit(): void {
    this.user = localStorage.getItem('username')
  }

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
    this.deleteBoard.emit({})
  }

}
