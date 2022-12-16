import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupComponent } from './components/popup/popup.component';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ShowPasswordDirective } from './directives/show-password.directive';

const components = [
  PopupComponent,
  SpinnerComponent,
  ToolbarComponent,
  ShowPasswordDirective ]

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [...components]
})
export class SharedModule { }
