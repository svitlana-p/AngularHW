import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit {
  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }
  logout(){
    this.auth.logout();
    this.router.navigate(['/login'])
  }
}
