import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { ValidationService } from './services/validation.service';

@Component({
  selector: 'ng2iv-validator',
  template: `
    <div class="invalid-feedback" [ngClass]="class" *ngIf="invalid">
      {{ message }}
    </div>
  `,
  styles: [
    `
      .invalid-feedback {
        display: block;
      }
    `,
  ],
})
export class Ng2InputValidatorComponent {
  @Input()
  control: AbstractControl<any, any> | null = null;
  @Input()
  class: string = '';

  constructor(private validationService: ValidationService) { }

  get invalid(): boolean {
    if (!this.control) return false;
    return this.validationService.isControlInvalid(this.control);
  }

  get message(): string | null {
    if (this.control) {
      this.validationService.validateControl(this.control);
      return this.validationService.getControlFirstMessage(this.control);
    }

    return null;
  }
}
