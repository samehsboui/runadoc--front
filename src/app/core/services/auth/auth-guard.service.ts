import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { TokenStorageService } from '../token/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService,
              private tokenStorageService: TokenStorageService) {}

  canActivate() {
    if (this.authService.currentUserValue &&
       !this.tokenStorageService.isTokenExpired()) {
      return true;
    }
    this.router.navigateByUrl('/login');
    return false;
  }
}
