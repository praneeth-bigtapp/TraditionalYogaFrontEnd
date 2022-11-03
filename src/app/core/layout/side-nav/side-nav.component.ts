import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { LengthPipe } from '@nglrx/pipes';
import { browserRefresh } from 'src/app/app.component';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { SendReceiveService } from 'src/app/shared/services/sendReceive.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
  // providers: [ LengthPipe ]
})
export class SideNavComponent implements OnInit {
  menuList: any = [];
  loginData: any;
  menuId: any;
  selectedIndex: number = 0;
  isRefresh!: boolean;
  selectedSubModuleId: any;
  className: any;

  status: boolean = false;
  clickEvent() {
    this.status = !this.status;
  }
  sidebar: boolean = false;

  constructor(private dataStorageService: DataStorageService,
    public router: Router,
    public sendReceiveService: SendReceiveService,
    // private lengthPipe: LengthPipe
    ) { 
      // this.lengthPipe.transform('Yet-another-string');
    }

  ngOnInit(): void {
    if (localStorage.getItem("LoginData")) {
      let data = localStorage.getItem("LoginData");
      if (data) {
        this.loginData = JSON.parse(data);
        this.menuList = this.loginData.permissions;
        
        localStorage.setItem("MenuList", JSON.stringify(this.menuList));
      }
      this.className = false;
      this.isRefresh = browserRefresh;
      this.selectedIndex = 0;
      this.menuId = 1;
      this.refresh();
    }
  }

  refresh() {
    debugger
    if (!this.isRefresh) {
      return;
    }
    this.className = false;
    if (localStorage.getItem('menuIndex')) {
      this.selectedIndex = Number(localStorage.getItem('menuIndex'));
    }
    this.selectedSubModuleId = localStorage.getItem('selectedSubModuleId');
    const selectedSubMenuId = Number(this.selectedSubModuleId);
    this.menuList.forEach((module: any) => {
      (module.subModules).forEach((subModule: any) => {
        if (subModule.subModuleId === selectedSubMenuId) {
          this.menuId = subModule.subModuleId;
        }
      });
    });
  }

  onModule(index: any) {
    // alert(index);
    this.selectedIndex = index;
    localStorage.setItem("menuIndex", index);
  }
  onMobileNavClick() {
    this.sidebar = !this.sidebar;
  }

  navigateToSubMenu(menu: any) {
    console.log(menu);
    this.menuId = menu.subModuleId;
    localStorage.setItem("selectedSubModuleId", this.menuId)
    this.sendReceiveService.navigateToMenu(this.menuId);
  }
}
