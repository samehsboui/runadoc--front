import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {ConfirmDialogData} from "../../core/models/confirm-dialog-data.model";

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
    title: string;
    content: string;
    constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) {
        this.title = this.data.title;
        this.content = this.data.content;
    }

    ngOnInit() {
    }

    onConfirmClick(): void {
        this.dialogRef.close(true);
    }

    onCloseClick(): void {
        this.dialogRef.close(false);
    }

}
