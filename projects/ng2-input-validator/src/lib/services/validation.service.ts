import { Injectable } from '@angular/core';
import { AbstractControl, UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { FormMessagesModel } from '../models/form-messages.model';
import { ValidationTranslateService } from './validation-translate.service';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  private customMessages: FormMessagesModel | null = null;

  constructor(private validationTranslateService: ValidationTranslateService) { }

  setCustomMessages(messages: FormMessagesModel) {
    this.customMessages = Object.assign({}, this.customMessages, messages);
  }

  getControlName(control: AbstractControl<any, any>): string | null {
    const formGroup = control.parent?.controls;
    if (!formGroup) return null;
    return Object.keys(formGroup).find((name) => control === (formGroup as any)[name]) || null;
  }

  getControlNameHierarchy(names: string[], control: AbstractControl<any, any>): string | null | undefined {
    if (!control) return null;
    if (control.parent?.parent instanceof UntypedFormArray) {
      const controlName = this.getControlName(control);
      controlName && names.push(controlName);
      return this.getControlNameHierarchy(names, control.parent);
    } else if (!control.parent?.parent) {
      const controlName = this.getControlName(control);
      controlName && names.push(controlName);
    } else {
      return this.getControlNameHierarchy(names, control.parent);
    }
    return null;
  }

  getFullControlName(control: AbstractControl<any, any>) {
    const names: string[] = [];
    this.getControlNameHierarchy(names, control);
    const controlName = names.reverse().join('.');
    return controlName;
  }

  getControlFirstMessage(control: AbstractControl<any, any>): string | null {
    if (!control || !control.errors || !this.hasControlMessages(control)) {
      return null;
    }

    const rules = this.getControlRules(control);
    if (rules && rules.length) {
      const firstValidationRule = rules[0];
      const messages = control.errors['_messages'];
      return messages[firstValidationRule];
    }
    return null;
  }

  getControlAllMessages(control: AbstractControl<any, any>, separator: string = ' '): string | null {
    if (!control || !control.errors || !this.hasControlMessages(control)) {
      return null;
    }

    let message = '';
    const messages = control.errors['_messages'];

    this.getControlRules(control)?.forEach((rule) => {
      message += messages[rule] + separator;
    });

    return message;
  }

  getRuleMessage(control: AbstractControl<any, any>, ruleName: string): string | null | undefined {
    if (!control || !control.errors) return null;

    const rule = control.errors[ruleName];
    const ruleParameters = Object.keys(rule);

    let message = this.findRuleMessage(control, ruleName);

    // No tokens to replace, return plain message
    if (ruleParameters.length === 0) {
      return message;
    }

    ruleParameters.forEach((parameter) => {
      const token = '${' + parameter + '}';
      message = message?.replace(token, rule[parameter]);
    });

    return message;
  }

  clearControlMessages(control: AbstractControl<any, any>) {
    if (control.errors)
      control.errors['_messages'] = {};
  }

  getControlRules(control: AbstractControl<any, any>): string[] | null {
    return control.errors && Object.keys(control.errors).filter((key) => key !== '_messages');
  }

  isControlInvalid(control: AbstractControl<any, any>): boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  isControlValid(control: AbstractControl<any, any>): boolean {
    return !this.isControlInvalid(control);
  }

  hasControlMessages(control: AbstractControl<any, any>): boolean {
    return (
      control.errors &&
      control.errors.hasOwnProperty('_messages') &&
      control.errors['_messages'] &&
      Object.keys(control.errors['_messages']).length > 0
    ) ?? false;
  }

  validateControl(control: AbstractControl<any, any>) {
    if (!control.errors) {
      return;
    }

    // Prevent keeping non relevant messages from previous validation
    this.clearControlMessages(control);

    const messages = control.errors['_messages'];

    if (messages)
      this.getControlRules(control)?.forEach((rule) => {
        messages[rule] = this.getRuleMessage(control, rule);
      });
  }

  validateAllControls(formGroup: UntypedFormGroup) {
    formGroup.markAsTouched({ onlySelf: true });

    Object.keys(formGroup.controls).forEach((controlName) => {
      const control = formGroup.get(controlName);

      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof UntypedFormGroup) {
        this.validateAllControls(control);
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof UntypedFormArray) {
        // tslint:disable-next-line:forin
        for (const controlIndex in control.controls) {
          this.validateAllControls((control.controls as UntypedFormGroup[])[controlIndex]);
        }
        control.markAsTouched({ onlySelf: true });
      }
    });
  }

  private findRuleMessage(control: AbstractControl, ruleName: string): string | undefined {
    const controlName = this.getFullControlName(control);

    if (this.customMessages &&
      this.customMessages[controlName] &&
      this.customMessages[controlName][ruleName]) {
      return this.customMessages[controlName][ruleName];
    }

    if (this.customMessages && this.customMessages[ruleName]) {
      return this.customMessages[ruleName];
    }

    const langTranslation = this.validationTranslateService.getTranslation(ruleName);

    if (langTranslation) {
      return this.validationTranslateService.getTranslation(ruleName)?.translation;
    }

    return ruleName;
  }
}
