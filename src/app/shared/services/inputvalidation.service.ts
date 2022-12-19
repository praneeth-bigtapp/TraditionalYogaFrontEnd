import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InputvalidationService {

  public static inputvalidation = {
    "keywordsvalidation": /([A-Za-z]+(,)*)+$/,
    "durationvalidation": /^[0-9]+:[0-9]+$/,
  }


}
