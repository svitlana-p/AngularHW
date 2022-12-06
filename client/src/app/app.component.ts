import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthService) {
  }
  title = '';
  potentialToken!: string | null
  ngOnInit(): void {
    this.potentialToken = localStorage.getItem('auth-token');
    if (this.potentialToken !== null) {
      this.auth.setToken(this.potentialToken)
    }
  }
}
