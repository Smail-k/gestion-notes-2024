import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Etudiant } from 'src/app/models/etudiant';
import { EtudiantService } from 'src/app/services/etudiant.service';

@Component({
  selector: 'app-supprimer-etudiant',
  templateUrl: './supprimer-etudiant.component.html',
  styleUrls: ['./supprimer-etudiant.component.css']
})
export class SupprimerEtudiantComponent implements OnInit {

  etudiants : Etudiant[]=[];
 
  constructor(public dialogRef: MatDialogRef<SupprimerEtudiantComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private ES : EtudiantService,
    private toastr: ToastrService, 
  ) { }
 
  ngOnInit(): void {
  }
 
  
closeDialog() {this.dialogRef.close(false);
this.toastr.info("Vous avez annuler l'opération");
}

/**
 * Supprimer Etudiant
 */
onDeleteEtudiant ()
{
  this.ES.DeleteEtudiant(this.data.etudiant.numero)
  .subscribe(data => {
    this.ListerEtudiants();
    });
  this.toastr.success('Suppression avec Succées', 'Suppression Etudiant'); 
}

/**
 * Lister etudiants
 */
ListerEtudiants(){
  this.ES.listeEtudiant("Annee4","2021/2022").subscribe(data => {
    this.etudiants = data}); }
  

}
