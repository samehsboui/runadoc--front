import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PasswordUpdateRequest } from 'src/app/core/models/requests/password-update-request';
import { ConfigService } from '../urls.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(private http: HttpClient, private configService: ConfigService) {
  }

  updatePassword(passwordUpdateRequest: PasswordUpdateRequest): Observable<any> {
    return this.http.post<any>(this.configService.getUpdatePasswordURL(), passwordUpdateRequest, httpOptions);
  }

}
