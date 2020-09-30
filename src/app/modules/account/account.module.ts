import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {InputFileModule} from 'ngx-input-file';
import {AgmCoreModule} from '@agm/core';
import {AccountComponent} from './account.component';
import {MyRendezVousComponent} from './my-rendezVous/my-rendezVous.component';
import {ProfileComponent} from './profile/profile.component';
import {UpdatePasswordComponent} from './update-password/update-password.component';

export const routes = [
    {
        path: '',
        component: AccountComponent, children: [
            {path: '', redirectTo: 'profile', pathMatch: 'full'},
            {path: 'my-rendezVous', component: MyRendezVousComponent},
            {path: 'profile', component: ProfileComponent},
            {path: 'update-password', component: UpdatePasswordComponent}
        ]
    }
];

@NgModule({
    declarations: [
        AccountComponent,
        MyRendezVousComponent,
        ProfileComponent,
        UpdatePasswordComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        InputFileModule,
        AgmCoreModule
    ]
})
export class AccountModule {
}
