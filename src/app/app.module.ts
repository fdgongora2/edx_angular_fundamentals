import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { GitSearchService } from './git-search.service';
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule 
  ],
  providers: [GitSearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
