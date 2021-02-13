import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AgmCoreModule} from '@agm/core';
import {MatVideoModule} from 'mat-video';
import {InputFileModule} from 'ngx-input-file';

import {SharedModule} from '../../shared/shared.module';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users.component';


export const routes = [
    {
        path: '',
        component: UsersComponent, children: [
            {path: 'listUsers', component: UserComponent}
        ]
    }
];

@NgModule({
    declarations: [
        UserComponent,UsersComponent
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
export class UsersModule {
}
