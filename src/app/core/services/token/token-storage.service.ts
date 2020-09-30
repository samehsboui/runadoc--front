import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {JwtResponse} from '../../models/responses/jwt-response';

const USER_TOKEN_KEY = 'AuthUser';

@Injectable({
    providedIn: 'root'
})
export class TokenStorageService {

    constructor(private jwtHelper: JwtHelperService) {
    }

    signOut() {
        window.sessionStorage.clear();
    }

    isTokenExpired(): boolean {
        return this.jwtHelper.isTokenExpired(this.getToken());
    }

    public saveUser(user: any) {
        window.sessionStorage.removeItem(USER_TOKEN_KEY);
        window.sessionStorage.setItem(USER_TOKEN_KEY, JSON.stringify(user));
    }

    public getUser(): JwtResponse {
        return JSON.parse(sessionStorage.getItem(USER_TOKEN_KEY));
    }

    public getToken(): string {
        if (JSON.parse(sessionStorage.getItem(USER_TOKEN_KEY))) {
            return JSON.parse(sessionStorage.getItem(USER_TOKEN_KEY)).token;
        }
    }

}
