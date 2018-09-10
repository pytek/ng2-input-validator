import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { Ng2InputValidatorComponent } from './ng2-input-validator.component';
import { ValidationService } from './services/validation.service';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  providers: [ValidationService],
  declarations: [Ng2InputValidatorComponent],
  exports: [Ng2InputValidatorComponent]
})
export class Ng2InputValidatorModule {}
