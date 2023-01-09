import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DialogPopupComponent } from '../components/dialog-popup/dialog-popup.component';

@Injectable()
export class SendReceiveService {
  dialogRef!: MatDialogRef<any>;

  constructor(
    private _http: HttpClient,
    public dialog: MatDialog,
    public toastr: ToastrService,
    public router: Router
  ) { }

  confirmationDialog(messsage: any) {
    this.dialogRef = this.dialog.open(DialogPopupComponent);

    this.dialogRef.componentInstance.data = { message: messsage };

    return this.dialogRef.afterClosed().pipe(
      map((result) => {
        return result;
      })
    );
  }

  showToast(toastType: string, title: string, message: any) {
    if (toastType == "error") {
      this.toastr.error(message, title, { timeOut: 6000 });
    }
    else if (toastType == "info") {
      this.toastr.info(message, title, { timeOut: 6000 });
    }
    else if (toastType == "success") {
      this.toastr.success(message, title, { timeOut: 6000 });
    }
    else if (toastType == "warning") {
      this.toastr.warning(message, title, { timeOut: 6000 });
    }
  }

  getPageLevelPermissions(permissionName: any) {
    if (permissionName == 'VIEW/ADD/EDIT/DELETE') {
      return { View: true, Edit: true, Delete: true, Add: true }
    }
    else if (permissionName == 'VIEW/ADD/EDIT') {
      return { View: true, Edit: true, Delete: false, Add: true }
    }
    else if (permissionName == 'VIEW/ADD') {
      return { View: true, Edit: false, Delete: false, Add: true }
    }
    else if (permissionName == 'VIEW/EDIT') {
      return { View: true, Edit: true, Delete: false, Add: false }
    }
    else if (permissionName == 'VIEW') {
      return { View: true, Edit: false, Delete: false, Add: false }
    }
    else {
      if (permissionName == 'No Permission') {
        return { View: false, Edit: false, Delete: false, Add: false }
      } else {
        return;
      }
    }
  }

  navigateToMenu(subMenuId: any) {
    if (subMenuId == 1) {
      this.router.navigateByUrl("admin/roles");
    }
    else if (subMenuId == 2) {
      this.router.navigateByUrl("admin/users");
    }
    else if (subMenuId == 3) {
      this.router.navigateByUrl("admin/module");
    }
    else if (subMenuId == 4) {
      this.router.navigateByUrl("admin/subModule");
    }
    else if (subMenuId == 5) {
      this.router.navigateByUrl("admin/rolePermission");
    }
    else if (subMenuId == 6) {
      this.router.navigateByUrl("dashboard");
    }
    else if (subMenuId == 9) {
      this.router.navigateByUrl("admin/addCourse");
    }
    else if (subMenuId == 10) {
      this.router.navigateByUrl("admin/studentProfile");
    }
    else if (subMenuId == 11) {
      this.router.navigateByUrl("admin/addpages");
    }
    else if (subMenuId == 12) {
      this.router.navigateByUrl("admin/gallery");
    }
    else if (subMenuId == 13) {
      this.router.navigateByUrl("admin/videogallery");
    }
    else if (subMenuId == 14) {
      this.router.navigateByUrl("admin/testimonials");
    }
    else if (subMenuId == 15) {
      this.router.navigateByUrl("admin/banners");
    }
    else if (subMenuId == 16) {
      this.router.navigateByUrl("admin/blacklistuser");
    }
    else if (subMenuId == 17) {
      this.router.navigateByUrl("admin/mapCourse");
    }
    else if (subMenuId == 18) {
      this.router.navigateByUrl("admin/parameters");
    }
    else if (subMenuId == 19) {
      this.router.navigateByUrl("admin/memberspage");
    }
    else if (subMenuId == 20) {
      this.router.navigateByUrl("admin/media");
    }
    else if (subMenuId == 21) {
      this.router.navigateByUrl("admin/coursemediapracticessession");
    }
    else if (subMenuId == 22) {
      this.router.navigateByUrl("admin/audio");
    }
    else if (subMenuId == 23) {
      this.router.navigateByUrl("admin/tasks");
    }
    else if (subMenuId == 24) {
      this.router.navigateByUrl("blank");
    }
    else if (subMenuId == 25) {
      this.router.navigateByUrl("admin/blank");
    }
    else if (subMenuId == 26) {
      this.router.navigateByUrl("admin/blank");
    }
    else if (subMenuId == 27) {
      this.router.navigateByUrl("admin/regioncreation");
    }
    else if (subMenuId == 28) {
      this.router.navigateByUrl("admin/alert");
    }
    else if (subMenuId == 29) {
      this.router.navigateByUrl("admin/createpraticelibrary");
    }
    else if (subMenuId == 30) {
      this.router.navigateByUrl("admin/practiceLibrary");
    }
    else if (subMenuId == 31) {
      this.router.navigateByUrl("admin/donationManagement");
    }
    else if (subMenuId == 32) {
      this.router.navigateByUrl("admin/createscriptures");
    }
    else if (subMenuId == 33) {
      this.router.navigateByUrl("admin/hidemenuoption");
    }
    else if (subMenuId == 35) {
      this.router.navigateByUrl("admin/pearlofwidsom");
    }
    else if (subMenuId == 36) {
      this.router.navigateByUrl("admin/courseMaterials");
    }
    else if (subMenuId == 37) {
      this.router.navigateByUrl("admin/onlineexam");
    }
    else if (subMenuId == 38) {
      this.router.navigateByUrl("admin/mappingregionstoCheifMentor");
    }
    else {
      console.log(" Sub Menu is not Mapped ")
      this.router.navigateByUrl("blank")
    }
  }

  getTemplatePermissions(actionId: any) {
    if (actionId == 1) {
      return ['NEW', 'UPD', 'DEL'];
    }
    else if (actionId == 2) {
      return ['NEW', 'UPD'];
    } else if (actionId == 3) {
      return ['NEW', 'DEL'];
    } else {
      return ['NEW'];
    }
  }
  ChangeTableName(element: any) {
    if (element.tableName == "BONDFORWARDS") {
      element.tableName = "BOND FORWARDS";
    }
    else if (element.tableName == "CASHSECURITIES") {
      element.tableName = "CASH SECURITIES";
    }
    else if (element.tableName == "OTCDERIVATIVES") {
      element.tableName = "OTC DERIVATIVES";
    }
    else if (element.tableName == "PRIVATE_EQUITY") {
      element.tableName = "PRIVATE EQUITY";
    }
    else {
      if (element.tableName == "UNQUOTEDSECURITIES") {
        element.tableName = "UNQUOTED SECURITIES";
      }
    }
  }

  revertTableName(name: any) {
    if (name == "BOND FORWARDS") {
      return 'BONDFORWARDS';
    } else if (name == "CASH SECURITIES") {
      return "CASHSECURITIES";
    } else if (name == "OTC DERIVATIVES") {
      return "OTCDERIVATIVES";
    } else if (name == "PRIVATE EQUITY") {
      return "PRIVATE_EQUITY";
    } else {
      if (name == "UNQUOTED SECURITIES") {
        return "UNQUOTEDSECURITIES";
      } else {
        return name;
      }
    }
  }
}