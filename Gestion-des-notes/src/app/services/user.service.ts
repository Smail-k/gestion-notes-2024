import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';


const url=  environment.apiUrl+ '/api'; 
@Injectable({
providedIn: 'root'
})
export class UtilisateurService {

 
  
  constructor(private http:HttpClient) { }
 
  listeUtilisateurs(): Observable<User[]>{
      //console.log("hnaaaa")
      return this.http.get<User[]>(`${url+'/users'}`);
    }
  
    public addUtilisateur(user: User): Observable<User> 
    { return this.http.post<User>(url +'/user/save' , user); }

    public userExist(username: string): Observable<boolean> 
    { return this.http.get<boolean>(`${url +'/user/exist'}/${username}`);}


}