import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class DonationserviceService extends BaseHttp {


  getdonationdetailsURL = ""


  getdonationdetails() {
    return this.get(this.getdonationdetailsURL)
  }
}
