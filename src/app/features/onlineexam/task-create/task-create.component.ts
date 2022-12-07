import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TaskCreateComponent>,

    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    console.log(data);
  }
  ngOnInit(): void {
  }

  
  closeDialog() {
    this.dialogRef.close({ event: 'close', data: null });
  }
}
