import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  AsyncValidatorFn
} from '@angular/forms';
import { FormArray, FormHooks } from '@angular/forms/src/model';

import { Observable } from 'rxjs';

import { FormMessagesModel } from './models/form-messages.model';
import { ValidationService } from './services/validation.service';

@Injectable()
export class Ng2Form {
  private form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private validationService: ValidationService
  ) {}

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

  get invalid(): boolean {
    return this.form.invalid;
  }

  get valid(): boolean {
    return this.form.valid;
  }

  setValidationMessages(messages: FormMessagesModel): void {
    this.validationService.setCustomMessages(messages);
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

  reset(
    value?: any,
    options?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
    }
  ): void {
    this.form.reset(value, options);
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

  registerControl(name: string, control: AbstractControl): AbstractControl {
    return this.form.registerControl(name, control);
  }

  addControl(name: string, control: AbstractControl): void {
    this.form.addControl(name, control);
  }

  removeControl(name: string): void {
    this.form.removeControl(name);
  }

  setControl(name: string, control: AbstractControl): void {
    this.form.setControl(name, control);
  }

  contains(controlName: string): boolean {
    return this.form.contains(controlName);
  }

  setValue(
    value: {
      [key: string]: any;
    },
    options?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
    }
  ): void {
    this.form.setValue(value, options);
  }

  getRawValue(): any {
    return this.form.getRawValue();
  }

  get parent(): FormGroup | FormArray {
    return this.form.parent;
  }

  get status(): string {
    return this.form.status;
  }

  get pending(): boolean {
    return this.form.pending;
  }

  get disabled(): boolean {
    return this.form.disabled;
  }

  get enabled(): boolean {
    return this.form.enabled;
  }

  get errors(): ValidationErrors | null {
    return this.form.errors;
  }

  get pristine(): boolean {
    return this.form.pristine;
  }

  get dirty(): boolean {
    return this.form.dirty;
  }

  get touched(): boolean {
    return this.form.touched;
  }

  get untouched(): boolean {
    return this.form.untouched;
  }

  get statusChanges(): Observable<any> {
    return this.form.statusChanges;
  }

  get updateOn(): FormHooks {
    return this.form.updateOn;
  }

  setValidators(newValidator: ValidatorFn | ValidatorFn[] | null) {
    this.form.setValidators(newValidator);
  }

  setAsyncValidators(
    newValidator: AsyncValidatorFn | AsyncValidatorFn[] | null
  ): void {
    this.form.setValidators(newValidator);
  }

  clearValidators(): void {
    this.form.clearValidators();
  }

  clearAsyncValidators(): void {
    this.form.clearAsyncValidators();
  }

  markAsTouched(opts?: { onlySelf?: boolean }): void {
    this.form.markAsTouched(opts);
  }

  markAsUntouched(opts?: { onlySelf?: boolean }): void {
    this.form.markAsUntouched(opts);
  }

  markAsDirty(opts?: { onlySelf?: boolean }): void {
    this.form.markAsDirty(opts);
  }

  markAsPristine(opts?: { onlySelf?: boolean }): void {
    this.form.markAsPristine(opts);
  }

  markAsPending(opts?: { onlySelf?: boolean; emitEvent?: boolean }): void {
    this.form.markAsPending(opts);
  }

  disable(opts?: { onlySelf?: boolean; emitEvent?: boolean }): void {
    this.form.disable(opts);
  }

  enable(opts?: { onlySelf?: boolean; emitEvent?: boolean }): void {
    this.form.enable(opts);
  }

  setParent(parent: FormGroup | FormArray): void {
    this.form.setParent(parent);
  }

  updateValueAndValidity(opts?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
  }): void {
    this.form.updateValueAndValidity(opts);
  }

  setErrors(
    errors: ValidationErrors | null,
    opts?: {
      emitEvent?: boolean;
    }
  ): void {
    this.form.setErrors(errors, opts);
  }

  get(path: Array<string | number> | string): AbstractControl | null {
    return this.form.get(path);
  }

  getError(errorCode: string, path?: string[]): any {
    return this.form.getError(errorCode, path);
  }

  hasError(errorCode: string, path?: string[]): boolean {
    return this.form.hasError(errorCode, path);
  }
}
