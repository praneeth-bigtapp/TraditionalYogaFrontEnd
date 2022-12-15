import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class DonationserviceService extends BaseHttp {


  getAllURL = "student/getAll?operation=donation";
  postURL = 'student/donationView'
  regionURL='webSite/getAll?operation=region'


  getdonationdetails() {
    return this.get(this.getAllURL)
  }
  postdonationdetails(data: any) {
    return this.post(this.postURL, data)
  }
  getregions() {
    return this.get(this.regionURL)
  }
}
