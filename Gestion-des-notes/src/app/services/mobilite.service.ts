import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mobilite } from '../models/mobilite';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MobiliteService {

  apiURL : string = environment.apiUrl+  "/api/mobilite"

  constructor(private http : HttpClient) { }

  public addMobilite(mobilite: Mobilite): Observable<Mobilite> 
      {  return this.http.post<Mobilite>(this.apiURL +'/add' , mobilite); }


}
