import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RendezVous } from '../models/entities/rendezVous';
import { ConfigService } from './urls.service';
import { CreateRendezVousRequest } from '../models/requests/create-rendezVous-request';

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {

  constructor(private http: HttpClient, private configService: ConfigService) {
  }

  getMyRendezVous(): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(this.configService.getMyRendezVousURL());
  }

  getAllRendezVous(): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(this.configService.getAllRendezVousURL());
  }

  getRendezVousById(id: number): Observable<RendezVous> {
    return this.http.get<RendezVous>(`${this.configService.getRendezVousURL()}/${id}`);
  }

  createRendezVous(createReservationRequest: CreateRendezVousRequest): Observable<any> {
    return this.http.post<any>(this.configService.getCreateRendezVousURL(), createReservationRequest);
  }

  deleteRendezVous(id: number): Observable<any> {
    return this.http.delete(`${this.configService.getDeleteRendezVousURL()}/${id}`);
  }
}
