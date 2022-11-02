import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { HeaderService } from './service/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  loginData: any;
  constructor(
    private router: Router,
    private dataStorageService: DataStorageService,
    private headerService: HeaderService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem("LoginData")) {
      let data = localStorage.getItem("LoginData");
      if (data) {
        this.loginData = JSON.parse(data);
      }
    }
  }

  onMobileNavClick() {
    // $('#sidebarCollapse').on('click', function () {
    //   $('#sidebar').toggleClass('active');
    // });
  }

  status: boolean = false;
  clickEvent() {
    this.status = !this.status;
  }

  onSignOut() {
    this.headerService.UserLogout(this.loginData.userId).subscribe((response) => {
      localStorage.clear();
      this.dataStorageService.isUserLoggedIn = false;
      this.router.navigateByUrl('logout');
    })
  }
}
