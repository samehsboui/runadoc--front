import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JwtResponse} from '../../models/responses/jwt-response';
import {ConfigService} from '../urls.service';
import { UserResponse } from '../../models/responses/user-response';

const httpJsonOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient, private configService: ConfigService) {
    }

    getUser(): Observable<JwtResponse> {
        return this.http.get<JwtResponse>(this.configService.getUserURL(), httpJsonOptions);
    }

    getAllUser(): Observable<UserResponse[]> {
        return this.http.get<UserResponse[]>(this.configService.getAllUserURL(), httpJsonOptions);
    }
}
