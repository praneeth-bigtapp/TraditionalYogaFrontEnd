import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InputvalidationService {

  public static inputvalidation = {
    "keywordsvalidation": /([A-Za-z]+(,)*)+$/,
    "durationvalidation": /^[0-9]+:[0-9]+$/,
    "videolink": /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/
  }


}
