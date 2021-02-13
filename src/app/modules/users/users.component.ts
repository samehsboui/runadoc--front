import { EtablissementService } from 'src/app/core/services/etablissement.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { UserService } from 'src/app/core/services/user/user.service';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { User } from 'src/app/core/models/entities/user';
import { JwtResponse } from 'src/app/core/models/responses/jwt-response';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  private currentUser: JwtResponse;
  etablissements: any;
  dataSource: any; 
  displayedColumns: string[] = ['specialty','tel', 'fullName','email','etablissements','roles','actions'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(public userService:UserService,private router:Router) { }

  ngOnInit() {
    this.userService.getUserss().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

 

  deleteUser (user:any) {
    const confirm = window.confirm('Are you sure you want to delete this User?') ;
    if (confirm === true) {
      this.userService.deleteUser(user.id).subscribe(res=>{
        this.userService.getUserss().subscribe(res=>{this.dataSource=res;})
        
      });
    }
  }
  
}
