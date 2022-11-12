import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    ToolbarComponent
  ]
})
export class FeaturesModule { }
