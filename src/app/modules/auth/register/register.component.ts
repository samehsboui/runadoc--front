import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { matchingPasswords, emailValidator } from 'src/app/utils/app-validators';
import { SignUpRequest } from 'src/app/core/models/requests/signup-request';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { TokenStorageService } from 'src/app/core/services/token/token-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  public registerForm: FormGroup;
  public hide = true;
  private signupRequest: SignUpRequest;
  private subscriptions = new Subscription();

  constructor(private authService: AuthService, public fb: FormBuilder, public router: Router,
              private snackBar: MatSnackBar, private tokenStorageService: TokenStorageService) {
    if (this.authService.currentUserValue && !this.tokenStorageService.isTokenExpired()) {
      this.router.navigateByUrl('');
    }
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      lastName: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      username: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {validator: matchingPasswords('password', 'confirmPassword')});
  }

  public onRegisterFormSubmit() {
    if (this.registerForm.valid) {
      this.signupRequest = new SignUpRequest(
        this.registerForm.get('firstName').value,
        this.registerForm.get('lastName').value,
        this.registerForm.get('username').value,
        this.registerForm.get('email').value,
        this.registerForm.get('password').value);

      const subRegister = this.authService.signUp(this.signupRequest)
                      .pipe(first()).subscribe(
                        data => {
                          this.router.navigateByUrl('/');
                          this.snackBar.open('You registered successfully!', '×',
                           { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
                        },
                        error => {});
      this.subscriptions.add(subRegister);
    }
  }

  ngOnDestroy() {
      this.subscriptions.unsubscribe();
  }
}
