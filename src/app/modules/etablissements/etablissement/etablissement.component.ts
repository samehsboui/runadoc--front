import {
    Component,
    OnInit,
    ViewChild,
    HostListener,
    ViewChildren,
    QueryList,
    OnDestroy
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { SwiperDirective} from 'ngx-swiper-wrapper';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {AppSettings, Settings} from 'src/app/app.settings';
import {Etablissement} from 'src/app/core/models/entities/etablissement';
import {EtablissementService} from 'src/app/core/services/etablissement.service';
import {Subscription} from 'rxjs';
import {JwtResponse} from '../../../core/models/responses/jwt-response';
import {CommonService} from '../../../core/services/common.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { UserResponse } from 'src/app/core/models/responses/user-response';
import { CreateRendezVousRequest } from 'src/app/core/models/requests/create-rendezVous-request';
import { RendezVousService } from 'src/app/core/services/rendezVous.service';
import { MatSnackBar } from '@angular/material';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-etablissement',
    templateUrl: './etablissement.component.html',
    styleUrls: ['./etablissement.component.scss']
})
export class EtablissementComponent implements OnInit, OnDestroy {
    @ViewChild('sidenav', {static: true}) sidenav: any;
    @ViewChildren(SwiperDirective) swipers: QueryList<SwiperDirective>;
    public psConfig: PerfectScrollbarConfigInterface = {
        wheelPropagation: true
    };
    public sidenavOpen = true;
    public etablissement: Etablissement;
    public settings: Settings;
    public rendezVousForm: FormGroup;
    private subscriptions = new Subscription();
    private currentUser: JwtResponse;
    public minDate = new Date();
    public users: UserResponse[];

    constructor(public appSettings: AppSettings,
                private activatedRoute: ActivatedRoute, private etablissementService: EtablissementService,
                private commonService: CommonService, private userService: UserService,
                public fb: FormBuilder, private rendezVousService: RendezVousService,
                private snackBar: MatSnackBar, public router: Router) {
        this.settings = this.appSettings.settings;
    }

    ngOnInit() {
        this.commonService.getCurrentUser().subscribe(x => {
            this.currentUser = x;
        });
        const sub = this.activatedRoute.params.subscribe(params => {
            this.getEtablissementById(params.id);
        });

        const sub2 = this.userService.getAllUser().subscribe(res => {
            this.users = res;
        });
        this.subscriptions.add(sub);
        this.subscriptions.add(sub2);
        if (window.innerWidth < 960) {
            this.sidenavOpen = false;
            this.sidenav.close();
        }

        this.rendezVousForm = this.fb.group({
            dateStart: [null, Validators.required],
            heureStart: [null, Validators.required],
            heureEnd: [null, Validators.required]
        });

    }

    onRendezVousnFormSubmit() {
        if (this.rendezVousForm.valid) {
            const datePipe = new DatePipe('en-US');
            const createRendezVousRequest = new CreateRendezVousRequest(
              this.rendezVousForm.get('heureStart').value,
              this.rendezVousForm.get('heureEnd').value,
              datePipe.transform(this.rendezVousForm.get('dateStart').value, 'dd-MM-yyyy'),
              this.etablissement);

            const subRendezVous = this.rendezVousService.createRendezVous(createRendezVousRequest).subscribe(
                              data => {
                                this.snackBar.open('RendezVous réservé avec succès !', '×',
                                 { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
                                this.router.navigateByUrl('/account/my-rendezVous');
                              },
                              error => {
                                this.snackBar.open(error.error, '×',
                                { panelClass: 'error', verticalPosition: 'top', duration: 6000 });
                              });
            this.subscriptions.add(subRendezVous);
          }
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    @HostListener('window:resize')
    public onWindowResize(): void {
        (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
    }

    public getEtablissementById(id) {
        const getEtablissementByIdSubscription = this.etablissementService.getEtablissementById(id).subscribe(data => {
            this.etablissement = data;
        });
        this.subscriptions.add(getEtablissementByIdSubscription);
    }
}
