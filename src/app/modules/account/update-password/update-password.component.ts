import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { matchingPasswords } from 'src/app/utils/app-validators';
import { MatSnackBar } from '@angular/material';
import { PasswordUpdateRequest } from 'src/app/core/models/requests/password-update-request';
import { PasswordService } from 'src/app/core/services/account/password.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit, OnDestroy {

  public updatePasswordForm: FormGroup;
  private subscriptions = new Subscription();

  constructor(public formBuilder: FormBuilder,private router: Router, public snackBar: MatSnackBar,
              private passwordService: PasswordService) { }

  ngOnInit() {
    this.updatePasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required]
    }, {validator: matchingPasswords('newPassword', 'confirmNewPassword')});
  }

  public updatePasswordFormSubmit() {
    const updatePasswordRequest = new PasswordUpdateRequest(
                                      this.updatePasswordForm.get('oldPassword').value,
                                      this.updatePasswordForm.get('newPassword').value,
                                      this.updatePasswordForm.get('confirmNewPassword').value);
    if (this.updatePasswordForm.valid) {
      const subUpdatePassword = this.passwordService.updatePassword(updatePasswordRequest)
                      .subscribe(data => {
                        this.snackBar.open('Your password updated successfully!', '×',
                        { panelClass: 'success', verticalPosition: 'top', duration: 2000 });
                        
      setTimeout(() => { this.router.navigateByUrl('');
      }, 2000);
                      }, error => {
                        this.snackBar.open('Please check your informations!', '×',
                       { panelClass: 'error', verticalPosition: 'top', duration: 2000 });
                      });
      this.subscriptions.add(subUpdatePassword);
      
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
