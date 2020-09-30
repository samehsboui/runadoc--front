import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UpdateProfileRequest } from 'src/app/core/models/requests/update-profile-request';
import { ConfigService } from '../urls.service';

const httpJsonOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient, private configService: ConfigService) {
  }

  updateProfile(updateProfileRequest: UpdateProfileRequest): Observable<any> {
    return this.http.post<any>(this.configService.getProfileUpdateURL(), updateProfileRequest, httpJsonOptions);
  }

  updateUserImage(formData: FormData): Observable<any> {
    return this.http.post(this.configService.getImageUpdateURL(), formData);
  }

}
