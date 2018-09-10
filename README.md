# ng2-input-validator
This is the Reactive Form wrapper to Angular 6 FormGroup (https://angular.io/api/forms/FormGroup) with support validation message.

![Example usage](https://user-images.githubusercontent.com/3649077/45321511-d2466600-b545-11e8-8e44-4e773f5dc701.gif)

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
import { Ng2Form } from 'projects/ng2-input-validator/src/lib/ng2-form';

@Component({
  selector: 'ng2ivd-form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.css']
})
export class Form1Component implements OnInit {
  form: Ng2Form = new Ng2Form();

  constructor() {}

  ngOnInit() {
    this.buildForm();
  }

  addTag(): void {
    this.tags.push(this.buildTagsForm());
  }

  onSubmit() {
    this.form.validate();

    if (this.form.valid) {
      alert(`form 1 is valid. Model: ${JSON.stringify(this.form.value)}`);
    } else {
      alert('form 1 is invalid');
    }
  }

  private buildForm() {
    this.form.group({
      mark: [null, Validators.required],
      model: [null, Validators.required],
      tags: this.form.array(
        [this.buildTagsForm('text tag'), this.buildTagsForm(null)],
        Validators.required
      )
    });

    this.form.setValidationMessages({
      tags: {
        required: 'Add at least one tag'
      }
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
}
```
HTML
```
<div>
  <form [formGroup]="form.formGroup">
    <div>
      <label for="mark">Mark</label>
      <input type="text" formControlName="mark">
      <ng2iv-validator [control]="form.getByPath('mark')" [messages]="form.messages"></ng2iv-validator>
    </div>
    <div>
      <label for="model">Model</label>
      <input type="text" formControlName="model">
      <ng2iv-validator [control]="form.getByPath('model')" [messages]="form.messages"></ng2iv-validator>
    </div>
    <div>
      <div>TAGS:</div>
      <ng2iv-validator [control]="tags" [messages]="form.messages"></ng2iv-validator>
      <div>
        <ul formArrayName="tags" *ngFor="let tag of tags.controls; let i = index" class="col-md-12">
          <li [formGroupName]="i">
            <input type="text" formControlName="text">
            <ng2iv-validator [control]="tag.get('text')" [messages]="form.messages"></ng2iv-validator>
            <span (click)="removeTag(i)">X</span>
          </li>
        </ul>
        <button type="button" (click)="addTag()">Add tag</button>
      </div>
    </div>
    <div>
      <button type="submit" (click)="onSubmit()">Submit</button>
    </div>
  </form>
</div>
```
