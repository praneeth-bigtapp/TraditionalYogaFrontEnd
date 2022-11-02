import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  public isUserLoggedIn: boolean = false;
  public MenuList: any;
}