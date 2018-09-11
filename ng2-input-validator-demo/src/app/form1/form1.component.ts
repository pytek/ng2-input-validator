import { Component, OnInit } from '@angular/core';

import { Validators, FormGroup, FormArray } from '@angular/forms';
import { Ng2Form } from 'ng2-input-validator';

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
