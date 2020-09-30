import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthLoginRequest } from 'src/app/core/models/requests/login-request';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { first } from 'rxjs/operators';
import { TokenStorageService } from 'src/app/core/services/token/token-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup;
  public hide = true;
  private subLogin: Subscription;
  private subscriptions = new Subscription();

  constructor(private authService: AuthService, public fb: FormBuilder,
              public router: Router, private tokenStorageService: TokenStorageService) {
    if (this.authService.currentUserValue && !this.tokenStorageService.isTokenExpired()) {
      this.router.navigateByUrl('');
    }
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      rememberMe: true
    });
  }

  public onLoginFormSubmit() {
    if (this.loginForm.valid) {
      const authLoginRequest = new AuthLoginRequest( this.loginForm.get('username').value,
                                             this.loginForm.get('password').value);
      const subLogin = this.authService.login(authLoginRequest)
                      .pipe(first()).subscribe(
                      data => {
                        this.router.navigateByUrl('');
                        },
                      error => {});
      this.subscriptions.add(subLogin);
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
