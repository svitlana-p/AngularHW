import { Component, Input, OnInit } from '@angular/core';
import { PopupService } from 'src/app/shared/services/popup.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
@Input() title!: string;
 constructor(public popupService: PopupService){}

 ngOnInit(): void {
   
 }
}
