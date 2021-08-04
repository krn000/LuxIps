import { AbstractControl,FormControl } from '@angular/forms';

export class PasswordValidation {
  static MatchPassword(AC: AbstractControl) {
    let password = AC.get('password').value; // to get value in input tag
    let confirmPassword = AC.get('confpassword').value; // to get value in input tag
    if (password === confirmPassword) {
      AC.get('confpassword').setErrors(null);
    } else {
      AC.get('confpassword').setErrors({ MatchPassword: true });
    }
  }
  static MatchPasswordforChange(AC: AbstractControl) {
    let newPassword = AC.get('newPassword').value; // to get value in input tag
    let confirmPassword = AC.get('confpassword').value; // to get value in input tag
     if (newPassword === confirmPassword) {
      AC.get('confpassword').setErrors(null);
    } else {
     AC.get('confpassword').setErrors({ MatchPassword: true });
     }
  }

}

export function noWhitespaceValidator(control: FormControl) {
  const isWhitespace = (control && control.value && control.value.toString() || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { 'whitespace': true };
}


export function removeSpaces(control: AbstractControl) {
  if (control && control.value && !control.value.replace(/\s/g, '').length) {
    control.setValue("");
  }
  return null;
}

export function replaceEmoji(control: AbstractControl) {
  // console.log(control.value)
  // if()
  if (control && control.value && new RegExp(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/, 'g').test(control.value)) {
    return control.value.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
  }
  return null;

}