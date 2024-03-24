import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stage } from '../models/stage';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StageService {

  apiURL : string = environment.apiUrl+  "/api/stage"

  constructor(private http : HttpClient) { }

  public addStage(stage: Stage): Observable<Stage> 
      {  return this.http.post<Stage>(this.apiURL +'/add' , stage); }

  public getEtudiantStage(numero: string): Observable<Stage[]> 
  {  return this.http.get<Stage[]>(`http://localhost:8080/api/etudiants/stage/etudiant/?numero=${numero}`); }

}
