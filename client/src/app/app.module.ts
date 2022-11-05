import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptop } from './shared/classes/tokenInterceptor';
import { GlobalErrorComponent } from './shared/components/global-error/global-error.component';




@NgModule({
  declarations: [
    AppComponent,
    GlobalErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: TokenInterceptop
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
