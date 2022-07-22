import { NgxMaskModule } from 'ngx-mask';
import { ComponentsModule } from './components/components.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErroDialogComponent } from './shared/components/dialog/erro/erro.component';

@NgModule({
  declarations: [AppComponent, ErroDialogComponent],
  imports: [
    BrowserModule,
    ComponentsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    AppRoutingModule,
    NgxMaskModule.forRoot({
			validation: true,
		})
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
