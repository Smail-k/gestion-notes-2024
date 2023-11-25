import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Etudiant } from '../models/etudiant';
const httpOptions = {headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  apiURL: string = 'http://localhost:8080/api/etudiants';
  constructor(private http: HttpClient) { 
  }

  listeEtudiant(promo:any,annee:any): Observable<Etudiant[]>{
    return this.http.get<Etudiant[]>(`${this.apiURL+'/liste/'}?promo=${promo}&annee=${annee}`); }
    
    Alletudiant(): Observable<Etudiant[]>{
      return this.http.get<Etudiant[]>(`${this.apiURL+'/all'}`); }

    /**
   * 
   * @param file le fichier qui contient les etudiants à importer
   * @returns une chaine de caractere de succées
   */
    importEtudiants(file:FormData):Observable<any>
    { 
      // Envoi de la requête POST
      return this.http.post( 'http://localhost:8080/api/excel/etudiant',file); }

      importModules(file:FormData):Observable<any>
    {  return this.http.post( 'http://localhost:8080/api/excel',file); }

    importNotes(file:FormData):Observable<any>
    {  return this.http.post( 'http://localhost:8080/api/excel/note',file); }

      public DeleteEtudiant(id: number)  
      {return this.http.delete(`${this.apiURL +'/delete' }/${id}`); }

      public addEtudiant(etudiant: Etudiant): Observable<Etudiant> 
      { return this.http.post<Etudiant>(this.apiURL +'/add' , etudiant); }

      public GetEtudiantMaxNumero(): Observable <string>{return this.http.get<string>(`${this.apiURL +'/lastNumero'}`); }

}
