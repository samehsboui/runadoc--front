import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {CommonService} from 'src/app/core/services/common.service';
import {JwtResponse} from 'src/app/core/models/responses/jwt-response';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html'
})
export class ToolbarComponent implements OnInit {

    @Output() onMenuIconClick: EventEmitter<any> = new EventEmitter<any>();
    private currentUser: JwtResponse;

    constructor(private commonService: CommonService) {
    }

    ngOnInit() {
        this.commonService.getCurrentUser().subscribe(x => {
            this.currentUser = x;
        });
    }

    isDisplayAddCourse() {
        return this.currentUser.trainer || this.currentUser.trainingCenter;
    }

    public sidenavToggle() {
        this.onMenuIconClick.emit();
    }
}
