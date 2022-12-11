import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = '';
  potentialToken!: string | null;
  
  constructor(private auth: AuthService) { }
  
  ngOnInit(): void {
    this.potentialToken = localStorage.getItem('auth-token');
    if (this.potentialToken !== null) {
      this.auth.setToken(this.potentialToken)
    }
  }
}
