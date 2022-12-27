import { Component } from '@angular/core';
import { Event, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { DataStorageService } from './shared/services/data-storage.service';

export let browserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'DMApplication';
  constructor(
    public dataStorage: DataStorageService,
    private router: Router
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
      }
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
        if (localStorage.getItem("LoginData")) {
          this.dataStorage.isUserLoggedIn = true;
        }
      }
    });
  }

  onActivate() {
    // window.scroll(0,0);
    // alert("Hi")
    window.scroll({ 
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
     });
 
     //or document.body.scrollTop = 0;
     //or document.querySelector('body').scrollTo(0,0)
    
 }

}
