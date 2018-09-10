import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup
} from '@angular/forms';
import { FormMessagesModel } from '../models/form-messages.model';
import { defaultValidationMessages } from '../lang/validation-messages';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  private customMessages: FormMessagesModel;

  setCustomMessages(messages: FormMessagesModel) {
    this.customMessages = Object.assign({}, this.customMessages, messages);
  }

  getControlName(control: AbstractControl): string | null {
    const formGroup = control.parent.controls;
    return (
      Object.keys(formGroup).find((name) => control === formGroup[name]) || null
    );
  }

  getControlNameHierarchy(
    names: string[],
    control: AbstractControl
  ): string | null {
    if (control.parent.parent instanceof FormArray) {
      names.push(this.getControlName(control));
      return this.getControlNameHierarchy(names, control.parent);
    } else if (!control.parent.parent) {
      names.push(this.getControlName(control));
    } else {
      return this.getControlNameHierarchy(names, control.parent);
    }
  }

  getFullControlName(control: AbstractControl) {
    const names = [];
    this.getControlNameHierarchy(names, control);
    const controlName = names.reverse().join('.');
    return controlName;
  }

  getControlFirstMessage(control: AbstractControl): string | null {
    if (!this.hasControlMessages(control)) {
      return null;
    }

    const firstValidationRule = this.getControlRules(control)[0];
    return control.errors._messages[firstValidationRule];
  }

  getControlAllMessages(
    control: AbstractControl,
    separator: string = ' '
  ): string | null {
    if (!this.hasControlMessages(control)) {
      return null;
    }

    let message = '';

    this.getControlRules(control).forEach((rule) => {
      message += control.errors._messages[rule] + separator;
    });

    return message;
  }

  getRuleMessage(control: AbstractControl, ruleName: string): string {
    const rule = control.errors[ruleName];
    const ruleParameters = Object.keys(rule);

    let message = this.findRuleMessage(control, ruleName);

    // No tokens to replace, return plain message
    if (ruleParameters.length === 0) {
      return message;
    }

    ruleParameters.forEach((parameter) => {
      const token = '${' + parameter + '}';
      message = message.replace(token, rule[parameter]);
    });

    return message;
  }

  clearControlMessages(control: AbstractControl) {
    control.errors._messages = {};
  }

  getControlRules(control: AbstractControl): string[] | null {
    return Object.keys(control.errors).filter((key) => key !== '_messages');
  }

  isControlInvalid(control: AbstractControl): boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  isControlValid(control: AbstractControl): boolean {
    return !this.isControlInvalid(control);
  }

  hasControlMessages(control: AbstractControl): boolean {
    return (
      control.errors &&
      control.errors.hasOwnProperty('_messages') &&
      Object.keys(control.errors._messages).length > 0
    );
  }

  validateControl(control: AbstractControl) {
    if (!control.errors) {
      return;
    }

    // Prevent keeping non relevant messages from previous validation
    this.clearControlMessages(control);

    this.getControlRules(control).forEach((rule) => {
      control.errors._messages[rule] = this.getRuleMessage(control, rule);
    });
  }

  validateAllControls(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((controlName) => {
      const control = formGroup.get(controlName);

      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllControls(control);
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormArray) {
        // tslint:disable-next-line:forin
        for (const controlIndex in control.controls) {
          this.validateAllControls(
            (control.controls as FormGroup[])[controlIndex]
          );
        }
        control.markAsTouched({ onlySelf: true });
      }
    });
  }

  private findRuleMessage(control: AbstractControl, ruleName: string): string {
    const controlName = this.getFullControlName(control);
    const hasControlCustomMessage =
      this.customMessages &&
      this.customMessages[controlName] &&
      this.customMessages[controlName][ruleName];
    const hasFormCustomMessage =
      this.customMessages && this.customMessages[ruleName];

    if (hasControlCustomMessage) {
      return this.customMessages[controlName][ruleName];
    }

    if (hasFormCustomMessage) {
      return this.customMessages[ruleName];
    }

    if (defaultValidationMessages[ruleName]) {
      return defaultValidationMessages[ruleName];
    }

    return ruleName;
  }
}
