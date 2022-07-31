import { Component, OnInit } from '@angular/core';
import { Validators, UntypedFormGroup, UntypedFormArray } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';
import { Ng2Form } from 'projects/ng2-input-validator/src/public-api';
import { TagValidator } from '../tag-validator';

@Component({
  selector: 'app-form1',
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

  buildTagsForm(text: string = null): UntypedFormGroup {
    return this.form.groupFormBuilder({
      text: [text, Validators.required]
    });
  }

  get tags(): UntypedFormArray {
    return <UntypedFormArray>this.form.getByPath('tags');
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
