import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AppRoutingModule } from './app-routing.module';
import { DbHomeComponent } from './db-home/db-home.component';
import { AppFooterComponent } from './page-sections/app-footer/app-footer.component';
import { AppHeaderComponent } from './page-sections/app-header/app-header.component';

import { DBMethodsService } from './shared/services/db-methods.service';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    DbHomeComponent,
    AppFooterComponent,
    AppHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [
    DBMethodsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
