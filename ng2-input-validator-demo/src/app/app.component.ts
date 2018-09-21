import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { ValidationTranslateService } from 'projects/ng2-input-validator/src/lib/services/validation-translate.service';

@Component({
  selector: 'ng2ivd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentLang: string;

  constructor(
    private translateService: TranslateService,
    private validationTranslateService: ValidationTranslateService
  ) {}

  ngOnInit(): void {
    this.currentLang = 'en';

    this.translateService.setDefaultLang('en');
    this.translateService.use(this.currentLang);

    this.initTranslations();
  }

  onLangChange(): void {
    this.currentLang = this.currentLang === 'en' ? 'pl' : 'en';
    this.translateService.use(this.currentLang);

    this.initTranslations();
  }

  private initTranslations() {
    this.translateService
      .get(['VALIDATIONS.required'])
      .subscribe((translations) => {
        this.validationTranslateService.setUpTranslations([
          {
            rule: 'required',
            translation: translations['VALIDATIONS.required']
          }
        ]);
      });
  }
}
