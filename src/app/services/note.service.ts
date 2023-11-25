import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { SemestreNote } from '../models/semestrenote';
import { EtudiantRattrapage } from '../models/etudiant_rattrapage';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  apiURL: string = 'http://localhost:8080/api/etudiants';
  constructor(private http: HttpClient) { 
  }

  listeEtudiant(promo:any,annee:any): Observable<any[]>{
    return this.http.get<any>(`${this.apiURL+'/moyenne'}/?promo=${promo}&annee=${annee}`);
    }


    listeNotesSemestre(promo:any,annee:any): Observable<any[]>{
      console.log(promo,annee);
      return this.http.get<any>(`${this.apiURL+'/note/semestre'}?promo=${promo}&anneeUniv=${annee}`);
    }

    listeAdmission(promo:any,annee:any, session:string): Observable<any[]>{
      if(session=='normale'){
        return this.http.get<any>(`${this.apiURL+'/listeAdmis'}?annee=${annee}&promo=${promo}`);
      }else{
        return this.http.get<any>(`${this.apiURL+'/listeAdmisRatt'}?annee=${annee}&promo=${promo}`);
      }
      
    }

    listeNotesUnite(promo:any,annee:any, sem:any, numero:any): Observable<any[]>{
      return this.http.get<any>(`${this.apiURL+'/note/semestre/etudiant'}?promo=${promo}&anneeUniv=${annee}&sem=${sem}&numero=${numero}`);
    }
    listeNotesMatiere(code:any,annee:any, numero:any): Observable<any[]>{
      return this.http.get<any>(`${this.apiURL+'/notes/unite/etudiant/'}?numero=${numero}&annee=${annee}&code=${code}`);
    }

    listeEtudiantRattrapagee(annee:any,promo:any): Observable<EtudiantRattrapage[]>{
   
      return this.http.get<any>(`${this.apiURL+'/rattrapages'}?annee=${annee}&promo=${promo}`);
    }
}
