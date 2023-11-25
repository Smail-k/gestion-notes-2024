import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Matiere } from '../models/matiere';
import { Unite } from '../models/unite';

const url="http://localhost:8080/api/unites";
@Injectable({
  providedIn: 'root'
})
export class UniteService {

  constructor(private http:HttpClient) { }
 listeUnite(): Observable<Unite[]>{ return this.http.get<Unite[]>(`${url+'/all'}`); }
 listeMatiere(): Observable<Matiere[]>{ return this.http.get<Matiere[]>(`${"http://localhost:8080/matieres/all"}`); }

  
}
