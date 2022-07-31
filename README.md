# ng2-input-validator

This is the Reactive Form wrapper to Angular 2+ FormGroup (https://angular.io/api/forms/FormGroup) with support validation message.

## Versions

| Angular          | ng2iv-validator |
|------------------|:---------------:|
| >=13.0.0 <14.0.0 |      v13.x      |
| >=12.0.0 <13.0.0 |      v12.x      |
| >=11.0.0 <12.0.0 |      v11.x      |
| >=10.0.0 <11.0.0 |      v10.x      |

## Example Usage

![Example usage](https://user-images.githubusercontent.com/3649077/45872579-aa9a9d80-bd90-11e8-905f-9ff790dc66c2.gif)

# Installation

Install the ng2-input-validator module and add it to dependencies in package.json:

```
npm i ng2-input-validator
```

import Ng2InputValidatorModule and ReactiveFormsModule in app.module.ts:

```
@NgModule({
  declarations: ...,
  imports: [BrowserModule, ReactiveFormsModule, Ng2InputValidatorModule],
  providers: ...,
  bootstrap: ...
})
export class AppModule {}
```

# Usage

component

```
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormArray } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';
import { Ng2Form } from 'projects/ng2-input-validator/src/lib/ng2-form';
import { TagValidator } from './tag-validator';

@Component({
  selector: 'ng2ivd-form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.scss'],
  providers: [Ng2Form]
})
export class Form1Component implements OnInit {
  constructor(
    public form: Ng2Form,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.buildForm();

    this.initTranslations();
    this.translateService.onLangChange.subscribe(() => this.initTranslations());
  }

  addTag(): void {
    this.tags.push(this.buildTagsForm());
  }

  onSubmit() {
    this.form.validate();

    if (this.form.valid) {
    }
  }

  private buildForm() {
    this.form.group({
      mark: [null, Validators.required],
      model: [null, Validators.required],
      motor: [null, Validators.required],
      tags: this.form.array(
        [this.buildTagsForm('text tag'), this.buildTagsForm(null)],
        [Validators.required, TagValidator.unique]
      )
    });
  }

  buildTagsForm(text: string = null): FormGroup {
    return this.form.groupFormBuilder({
      text: [text, Validators.required]
    });
  }

  get tags(): FormArray {
    return <FormArray>this.form.getByPath('tags');
  }

  removeTag(i: number): void {
    this.tags.removeAt(i);
  }

  private initTranslations() {
    this.translateService
      .get(['FORM1.tags_required', 'FORM1.tags_unique'])
      .subscribe((translations) => {
        this.form.setValidationMessages({
          tags: {
            required: translations['FORM1.tags_required'],
            uniqueTags: translations['FORM1.tags_unique']
          }
        });
      });
  }
}
```

HTML

```
<h2>Example Form 1</h2>
<div class="alert alert-warning" role="alert" *ngIf="form.touched && form.invalid">
  {{'COMMON.FormIsInvalid' | translate }}
</div>
<div class="alert alert-success" role="alert" *ngIf="form.touched && form.valid">
  {{'COMMON.FormIsValid' | translate }}. {{'COMMON.FormData' | translate }}: {{ form.value | json }}
</div>

<form [formGroup]="form.formGroup">
  <div class="form-group row">
    <label for="mark" class="col-sm-2 col-form-label" translate>FORM1.Mark</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="mark" placeholder="{{ 'FORM1.Mark' | translate }}" formControlName="mark">
      <ng2iv-validator [control]="form.getByPath('mark')"></ng2iv-validator>
    </div>
  </div>
  <div class="form-group row">
    <label for="model" class="col-sm-2 col-form-label" translate>FORM1.Model</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="model" placeholder="{{ 'FORM1.Model' | translate }}" formControlName="model">
      <ng2iv-validator [control]="form.getByPath('model')"></ng2iv-validator>
    </div>
  </div>
  <div class="form-group row">
    <label for="motor" class="col-sm-2 col-form-label" translate>FORM1.Motor</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="motor" placeholder="{{ 'FORM1.Motor' | translate }}" formControlName="motor">
      <ng2iv-validator [control]="form.getByPath('motor')"></ng2iv-validator>
    </div>
  </div>
  <fieldset class="form-group">
    <div class="row">
      <legend class="col-form-label col-sm-2 pt-0" translate>FORM1.Tags</legend>
      <div class="col-sm-10">
        <ng2iv-validator [control]="tags"></ng2iv-validator>
        <div formArrayName="tags" *ngFor="let tag of tags.controls; let i = index" class="col-md-12">
          <div [formGroupName]="i">
            <div class="d-flex bd-highlight">
              <div class="p-2 w-100 bd-highlight">
                <input type="text" class="form-control" id="model-{{i}}" placeholder="Tag" formControlName="text">
                <ng2iv-validator [control]="tag.get('text')"></ng2iv-validator>
              </div>
              <div class="p-2 flex-shrink-1 bd-highlight">
                <span (click)="removeTag(i)">
                </span>
              </div>
            </div>
          </div>
        </div>
        <button type="button" class="btn btn-secondary" (click)="addTag()" translate>FORM1.AddTag</button>
      </div>
    </div>
  </fieldset>
  <div class="form-group row">
    <div class="col-sm-10">
      <button type="submit" class="btn btn-primary" (click)="onSubmit()" translate>COMMON.Submit</button>
    </div>
  </div>
</form>
```
