import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-color-piker',
  templateUrl: './color-piker.component.html',
  styleUrls: ['./color-piker.component.css']
})
export class ColorPikerComponent {
  @Input() id!: string;
  color!: string;
  @Output() chooseColor = new EventEmitter<{ color: string, element: string }>()

  constructor(public dashboardService: DashboardService,
    private route: ActivatedRoute,) { }

  setColor(event: Event) {

    const element = (event.target as HTMLInputElement).id
    this.chooseColor.emit({ color: this.color, element: element })
    const boardId: string = this.route.snapshot.params.id;
    this.dashboardService.update(boardId, element, this.color).subscribe();
  }
}
