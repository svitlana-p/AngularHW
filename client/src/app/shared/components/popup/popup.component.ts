import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  @Input() title!: string;
  constructor(public popupService: PopupService) { }

}
