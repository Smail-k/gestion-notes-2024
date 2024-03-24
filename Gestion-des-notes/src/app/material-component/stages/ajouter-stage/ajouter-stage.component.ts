import { StageService } from './../../../services/stage.service';
import { Stage } from './../../../models/stage';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ajouter-stage',
  templateUrl: './ajouter-stage.component.html',
  styleUrls: ['./ajouter-stage.component.css']
})
export class AjouterStageComponent implements OnInit {

  
  form!: FormGroup;
  mobilite !:Boolean;
  errorDuree !:string;
  constructor(private formBuilder: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any,private toastr:ToastrService,private service : StageService) { }
  ngOnInit() {
    let validator= this.inRangeValidator(1, 2);
    this.errorDuree="durée de stage en 3A est limité entre 4 et 8 sem"
    console.log(this.data.etudiant)
    if((this.data.etudiant.promotion.promo+"").startsWith("4a")){
      validator= this.inRangeValidator(8,12);
      this.errorDuree="durée de stage en 4A est limité entre 8 et 12 sem"
    }else if((this.data.etudiant.promotion.promo+"").startsWith("5a")){
      validator= this.inRangeValidator(5,6);
      this.errorDuree="durée de stage en A est limité entre 20 et 24 sem"
    }
    this.mobilite=this.data.mobilite?.pays!= undefined;
    this.form = this.formBuilder.group({
      ville: ['', Validators.required],
      nbrSem: ['', Validators.required,validator],
      societe: ['', Validators.required],
      AnneeUniversitaire: ['', [Validators.required]],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      //note: ['', Validators.required],
      description: [''],
      numConvention : ['', Validators.required]
    });
  }
  get f (){ return this.form.controls }

  inRangeValidator(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      const value = +control.value; // convert to number
      return new Promise((resolve) => {
        if (isNaN(value) || value < min || value > max) {
          resolve({ 'outOfRange': true });
        } else {
          resolve(null);
        }
      });
    };
  }
  onAdd(){
    let stage : Stage={
      duree : this.f.nbrSem.value,
      etudiant : { numero : this.data.etudiant.numero },
      societe : this.f.societe.value,
      annee : this.f.AnneeUniversitaire.value,
      description : this.f.description.value,
      dateDebut : this.f.dateDebut.value,
      dateFin : this.f.dateFin.value,
      numConvention : this.f.numConvention.value
    };
   
    this.service.addStage(stage).subscribe(res=>{
      console.log(res);
      this.toastr.success('Ajouter stage',"L'ajout à été fait avec succés"); 
    })
  }

}
