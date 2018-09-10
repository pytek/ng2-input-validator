import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { Ng2InputValidatorModule } from 'ng2-input-validator';

import { AppComponent } from './app.component';
import { Form1Component } from './form1/form1.component';

@NgModule({
  declarations: [AppComponent, Form1Component],
  imports: [BrowserModule, ReactiveFormsModule, Ng2InputValidatorModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
