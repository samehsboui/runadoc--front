import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';

import {TokenStorageService} from '../token/token-storage.service';

import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {JwtResponse} from 'src/app/core/models/responses/jwt-response';
import {SignUpRequest} from 'src/app/core/models/requests/signup-request';
import {AuthLoginRequest} from 'src/app/core/models/requests/login-request';
import {ConfigService} from '../urls.service';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    constructor(private http: HttpClient, private tokenStorage: TokenStorageService,
                private router: Router, private configService: ConfigService) {
        this.currentUserSubject = new BehaviorSubject<JwtResponse>(this.tokenStorage.getUser());
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): JwtResponse {
        return this.currentUserSubject.value;
    }

    public saveUserData(data) {
        this.tokenStorage.saveUser(data);
        this.currentUserSubject.next(data);
    }

    login(credentials: AuthLoginRequest) {
        return this.http.post<JwtResponse>(this.configService.getLoginURL(), credentials, httpOptions)
            .pipe(map(userInfo => {
                this.saveUserData(userInfo);
                return userInfo;
            }));
    }

    signUp(info: SignUpRequest) {
        return this.http.post<JwtResponse>(this.configService.getSignupURL(), info, httpOptions)
            .pipe(map(userInfo => {
                this.saveUserData(userInfo);
                return userInfo;
            }));
    }

    logout() {
        this.tokenStorage.signOut();
        this.currentUserSubject.next(null);
        this.router.navigateByUrl('login');
    }

}
