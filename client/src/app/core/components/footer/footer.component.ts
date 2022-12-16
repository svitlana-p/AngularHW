import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./footer.component.css']
})
export class FooterComponent  {
  constructor(public authService: AuthService,
    private router: Router
  ) { }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }
}
