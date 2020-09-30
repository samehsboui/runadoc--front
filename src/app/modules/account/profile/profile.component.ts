import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { emailValidator } from 'src/app/utils/app-validators';

import { JwtResponse } from 'src/app/core/models/responses/jwt-response';
import { UpdateProfileRequest } from 'src/app/core/models/requests/update-profile-request';

import { CommonService } from 'src/app/core/services/common.service';
import { ProfileService } from 'src/app/core/services/account/profile.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  public infoForm: FormGroup;
  private currentUser: JwtResponse;
  private subscriptions = new Subscription();

  constructor(public formBuilder: FormBuilder,private router: Router, public snackBar: MatSnackBar,
              private commonService: CommonService, private profileService: ProfileService,
              private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.commonService.getCurrentUser().subscribe(x => {
      this.currentUser =  x;
    });
    this.infoForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      image: null
    });
  }

  public updateProfileFormSubmit() {
    const updateProfileRequest = new UpdateProfileRequest(
                                this.infoForm.get('name').value,
                                this.infoForm.get('email').value);

    if (this.infoForm.valid) {
      const subProfile = this.profileService.updateProfile(updateProfileRequest)
                         .subscribe(data => {
                          this.userService.getUser().subscribe(user => {
                            this.authService.saveUserData(user);
                          });
                          this.snackBar.open('Your profile is updated successfully!', '×',
                          { panelClass: 'success', verticalPosition: 'top', duration: 2000 });
                          
        setTimeout(() => { this.router.navigateByUrl('');
        }, 2000);
            }, error => {
              this.snackBar.open('Please check your informations!', '×',
             { panelClass: 'error', verticalPosition: 'top', duration: 2000 });
            });
      this.subscriptions.add(subProfile);
      if (this.infoForm.get('image').value) {
        const image = new FormData();
        image.append('profileImage', this.infoForm.get('image').value[0].file);
        const subUpdateUserImage = this.profileService.updateUserImage(image).subscribe(data => { }, error => {});
        this.subscriptions.add(subUpdateUserImage);
      }
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
