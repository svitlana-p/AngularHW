import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  filterTerm: string = '';
  sortValue: string = '';
  sortDirection: string = 'asc';

  @Input() title!:string;
  @Output() filterBoards = new EventEmitter<{ filterTerm: string}>()
  @Output() sortBoards = new EventEmitter<{sortValue: string, sortDirection: string}>()
  
  constructor() { }
 
  onFilter(){
    this.filterBoards.emit({filterTerm: this.filterTerm})
  } 
  onSortDirection(value:string) {
    this.sortDirection = value;
  }
  onSort() {
    this.sortBoards.emit({sortValue: this.sortValue, sortDirection: this.sortDirection})
  }
  ngOnInit(): void {
  }
}
