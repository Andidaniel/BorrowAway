import { Injectable } from '@angular/core';
import * as errorsData from '../errors.json';

interface Error {
  errorCode: string;
  errorMessage: string;
}
@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  private errors: Error[] = Object.values(errorsData);
  constructor() {}

  public getError(errorCode: string): string {
    let errorToReturn: string = '';
    this.errors.forEach((e: Error) => {
      if (e.errorCode == errorCode) {
        errorToReturn = e.errorMessage;
      }
    });
    if (errorToReturn === '') {
      return 'An error has occured';
    } else {
      return errorToReturn;
    }
  }
}
