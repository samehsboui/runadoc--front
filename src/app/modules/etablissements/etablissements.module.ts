import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AgmCoreModule} from '@agm/core';
import {MatVideoModule} from 'mat-video';
import {InputFileModule} from 'ngx-input-file';

import {SharedModule} from '../../shared/shared.module';

import {EtablissementComponent} from './etablissement/etablissement.component';

export const routes = [
    {path: ':id', component: EtablissementComponent}
];

@NgModule({
    declarations: [
        EtablissementComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        AgmCoreModule,
        MatVideoModule,
        SharedModule,
        InputFileModule
    ]
})
export class EtablissementsModule {
}
