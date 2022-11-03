import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { TokenInterceptop } from './shared/classes/tokenInterceptor';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { FocusDirective } from './shared/directives/focus.directive';
import { FilterBoardPipe } from './shared/pipes/filter-board.pipe';
import { SortPipe } from './shared/pipes/sort.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ComponentsModule } from './shared/components/components.module';



@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    DashboardPageComponent,
    BoardPageComponent,
    FocusDirective,
    FilterBoardPipe,
    SortPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    ComponentsModule,
    HttpClientModule,
    DragDropModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: TokenInterceptop
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
