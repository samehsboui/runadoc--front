import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar} from '@angular/material';
import {RendezVous} from 'src/app/core/models/entities/rendezVous';
import {RendezVousService} from 'src/app/core/services/rendezVous.service';
import {ConfirmDialogComponent} from '../../../shared/confirm-dialog/confirm-dialog.component';
import {Subscription} from 'rxjs';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
    selector: 'app-my-rendezVous',
    templateUrl: './my-rendezVous.component.html',
    styleUrls: ['./my-rendezVous.component.scss']
})
export class MyRendezVousComponent implements OnInit, OnDestroy {
    displayedColumns: string[] = ['etablissement', 'dateRendezVous', 'price', 'actions'];
    dataSource: MatTableDataSource<RendezVous>;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    private subscriptions = new Subscription();
    private title: string;
    private content: string;

    constructor(public rendezVousService: RendezVousService, public dialog: MatDialog, private snackBar: MatSnackBar,
                private translateService: TranslateService) {
        this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
            this.dialogContentTranslate();
        });
    }

    ngOnInit() {
        this.dialogContentTranslate();
        this.rendezVousService.getMyRendezVous().subscribe(res => {
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    dialogContentTranslate() {
        this.translateService.get('dialog.deleteTitle').subscribe(res => {
          this.title = res;
        });
        this.translateService.get('dialog.deleteRendezVousContent').subscribe(res => {
          this.content = res;
        });
    }

    public remove(rendezVous: RendezVous) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '430px',
            data: {
                title: this.title,
                content: this.content
            }
        });

        const deleteDialogSubscription = dialogRef.afterClosed().subscribe(result => {
            if (result) {
                // delete it from the back side
                this.rendezVousService.deleteRendezVous(rendezVous.id).subscribe((response) => {
                    // delete it from the datatable
                    const index: number = this.dataSource.data.indexOf(rendezVous);
                    if (index !== -1) {
                        this.dataSource.data.splice(index, 1);
                        this.dataSource = new MatTableDataSource<RendezVous>(this.dataSource.data);
                        this.dataSource.paginator = this.paginator;
                        this.dataSource.sort = this.sort;
                    }
                }, () => {
                    this.snackBar.open('Failed delete operation !', '×',
                        { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
                });
            }
        });

        this.subscriptions.add(deleteDialogSubscription);
    }

    public applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

}
