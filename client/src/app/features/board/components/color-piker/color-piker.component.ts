import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DashboardService } from 'src/app/core/services/dashboard.service';
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
    const element = (event.target as HTMLInputElement).id;
    let columnColor = ''
    if(element === 'Todo') columnColor = 'firstColor';
    if(element === 'In Progress') columnColor = 'secondColor';
    if(element === 'Done') columnColor = 'thirdColor';
    this.chooseColor.emit({ color: this.color, element: element })
    const boardId: string = this.route.snapshot.params.id;
    this.dashboardService.update(boardId, columnColor, this.color).subscribe();
  }
}
