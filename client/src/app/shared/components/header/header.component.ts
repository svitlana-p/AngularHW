import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user!: string | null;

  ngOnInit(): void {
    this.user = localStorage.getItem('username')
  }

}
