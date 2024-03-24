import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Configuration } from '../models/configuration';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  apiURL: string = environment.apiUrl+ '/api/configuration';
  
  constructor(private http: HttpClient) { 
  }

  listeConfiguration(): Observable<Configuration[]>{
    return this.http.get<Configuration[]>(`${this.apiURL+'/all'}`);
    }

    public addConfiguration(config: Configuration): Observable<Configuration> 
    { return this.http.post<Configuration>(this.apiURL +'/add' , config); } 
}
