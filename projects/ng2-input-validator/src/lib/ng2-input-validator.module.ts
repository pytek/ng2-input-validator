import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { Ng2InputValidatorComponent } from './ng2-input-validator.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  providers: [],
  declarations: [Ng2InputValidatorComponent],
  exports: [Ng2InputValidatorComponent],
})
export class Ng2InputValidatorModule {}
