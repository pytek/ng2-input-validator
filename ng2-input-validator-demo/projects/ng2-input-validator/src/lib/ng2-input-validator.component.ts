import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormMessagesModel } from './models/form-messages.model';
import { ValidationService } from './services/validation.service';

@Component({
  selector: 'ng2iv-validator',
  template: `
  <div class="ng2-input-validator-invalid-feedback" [ngClass]="class" *ngIf="invalid">
  {{ message }}
</div>
  `,
  styles: [
    `
      .ng2-input-validator-invalid-feedback {
        display: block;
        font-weight: 600;
      }
    `
  ]
})
export class Ng2InputValidatorComponent implements OnInit {
  @Input()
  control: AbstractControl;
  @Input()
  messages: FormMessagesModel;
  @Input()
  class: string;

  constructor(private validationService: ValidationService) {}

  ngOnInit() {
    if (this.messages) {
      this.validationService.setCustomMessages(this.messages);
    }
  }

  get invalid(): boolean {
    return this.validationService.isControlInvalid(this.control);
  }

  get message(): string {
    this.validationService.validateControl(this.control);
    return this.validationService.getControlFirstMessage(this.control);
  }
}
