import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogComponent } from './dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  constructor(private snackBar: MatSnackBar) { }

  showNotification(messageType: 'Error' | 'Success' | 'Warning', displayMessage: string) {

    this.snackBar.openFromComponent(DialogComponent, {

      data: {
        message: displayMessage,

        type: messageType
      },

      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: messageType
    });
  }

}
