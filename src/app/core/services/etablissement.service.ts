import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Etablissement } from '../models/entities/etablissement';
import { ConfigService } from './urls.service';

@Injectable({
  providedIn: 'root'
})
export class EtablissementService {

  constructor(private http: HttpClient, private configService: ConfigService) {
  }

  getAllEtablissements(): Observable<Etablissement[]> {
    return this.http.get<Etablissement[]>(this.configService.getAllEtablissementsURL());
  }

  getEtablissementById(id: number): Observable<Etablissement> {
    return this.http.get<Etablissement>(`${this.configService.getEtablissementURL()}/${id}`);
  }

}
