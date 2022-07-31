import { Injectable } from '@angular/core';

import { defaultValidationMessages } from '../lang/validation-messages';

@Injectable({
  providedIn: 'root',
})
export class ValidationTranslateService {
  private translations: { rule: string; translation: string }[] = [];

  constructor() {
    this.initTranslations();
  }

  public setUpTranslations(translations: { rule: string; translation: string }[]) {
    this.translations = Object.assign(this.translations, translations);
  }

  public getTranslation(rule: string) {
    return this.translations.find((translation) => translation.rule === rule);
  }

  private initTranslations() {
    Object.getOwnPropertyNames(defaultValidationMessages).forEach((rule) => {
      this.translations.push({
        rule: rule,
        translation: (defaultValidationMessages as any)[rule],
      });
    });
  }
}
