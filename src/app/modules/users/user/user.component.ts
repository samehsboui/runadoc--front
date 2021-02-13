import {
    Component,
    OnInit,
    ViewChild,
    HostListener,
    ViewChildren,
    QueryList,
    OnDestroy, AfterViewInit
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import { UserService } from 'src/app/core/services/user/user.service';


@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit , AfterViewInit {
    users;
    displayedColumns: string[] = ['id', 'fullName'];
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    constructor(public userService:UserService,private router:Router) { }

      
   

    ngOnInit() {
        this.userService.getAllUser().subscribe(res => {
          this.users = res;
        });
    
      }

      ngAfterViewInit() {
        this.users.paginator = this.paginator;
      }
}
