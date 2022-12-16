import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user!: string | null;

  constructor(public authService: AuthService){}
  
  ngOnInit(): void {
    this.user = localStorage.getItem('username')
  }

}
