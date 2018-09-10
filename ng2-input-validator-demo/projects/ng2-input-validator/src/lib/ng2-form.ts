import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { FormArray } from '@angular/forms/src/model';

import { Observable } from 'rxjs';

import { FormMessagesModel } from './models/form-messages.model';
import { ValidationService } from './services/validation.service';

@Injectable()
export class Ng2Form {
  private form: FormGroup;
  private customValidationMessages: FormMessagesModel;
  private formBuilder: FormBuilder;
  private validationService: ValidationService;

  constructor(
    formBuilder?: FormBuilder,
    validationService?: ValidationService
  ) {
    this.formBuilder = formBuilder || new FormBuilder();
    this.validationService = validationService || new ValidationService();
  }

  get valueChanges(): Observable<any> {
    return this.form.valueChanges;
  }

  get value(): any {
    return this.form.value;
  }

  get formGroup(): FormGroup {
    return this.form;
  }

  getByPath(path: Array<string | number> | string): AbstractControl | null {
    return this.form.get(path);
  }

  get controls(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  getFormGroupInsideArray(arrayName: string, index: number): FormGroup {
    return (this.form.controls[arrayName] as FormArray).controls[
      index
    ] as FormGroup;
  }

  getControlsInArray(
    arrayName: string,
    index: number
  ): { [key: string]: AbstractControl } {
    return this.getFormGroupInsideArray(arrayName, index).controls;
  }

  get messages(): FormMessagesModel {
    return this.customValidationMessages;
  }

  get invalid(): boolean {
    return this.form.invalid;
  }

  get valid(): boolean {
    return this.form.valid;
  }

  setValidationMessages(messages: FormMessagesModel): void {
    this.customValidationMessages = messages;
  }

  groupFormBuilder(
    controlsConfig: { [key: string]: any },
    extra?: { [key: string]: any } | null
  ): FormGroup {
    return this.formBuilder.group(controlsConfig, extra);
  }

  array(
    controlsConfig: any[],
    validator?: any | null,
    asyncValidator?: any | null
  ) {
    return this.formBuilder.array(controlsConfig, validator, asyncValidator);
  }

  group(
    controlsConfig: { [key: string]: any },
    extra?: { [key: string]: any } | null
  ): void {
    this.form = this.formBuilder.group(controlsConfig, extra);
  }

  reset(): void {
    this.form.reset();
  }

  resetControl(controlName: string, value?: any): void {
    this.form.get(controlName).reset(value);
  }

  validate(): void {
    this.validationService.validateAllControls(this.form);
  }

  patchValue(
    value: { [key: string]: any },
    options?: { onlySelf?: boolean; emitEvent?: boolean }
  ): void {
    this.form.patchValue(value, options);
  }
}
