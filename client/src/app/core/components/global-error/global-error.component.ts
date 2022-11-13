import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-global-error',
  templateUrl: './global-error.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./global-error.component.css']
})
export class GlobalErrorComponent {

  constructor(public errorService: ErrorService) { }

  clear() {
    this.errorService.clear()
  }
}
