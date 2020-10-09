import { AbstractControl, FormArray } from '@angular/forms';

export class TagValidator {
  public static unique(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const uniqueNames = [];
    let isValid = true;

    if (control instanceof FormArray) {
      control.controls.forEach((subControl) => {
        const text = subControl.value.text;

        if (uniqueNames.find((item) => item === text)) {
          isValid = false;
        }
        uniqueNames.push(text);
      });
    }

    if (isValid) {
      return null;
    }
    return { uniqueTags: true };
  }
}
