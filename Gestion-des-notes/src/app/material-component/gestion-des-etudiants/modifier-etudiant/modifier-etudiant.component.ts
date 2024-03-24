import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { annee_universitaire } from 'src/app/models/annee_universitaire';
import { countries } from 'src/app/models/countriesData';
import { Etudiant } from 'src/app/models/etudiant';
import { Promotion } from 'src/app/models/promotion';
import { EtudiantService } from 'src/app/services/etudiant.service';
import { PromotionService } from 'src/app/services/promotion.service';

@Component({
  selector: 'app-modifier-etudiant',
  templateUrl: './modifier-etudiant.component.html',
  styleUrls: ['./modifier-etudiant.component.css']
})
export class ModifierEtudiantComponent implements OnInit {

  constructor(private fb: FormBuilder,private es:EtudiantService ,private toastr:ToastrService ,private ps:PromotionService,@Inject(MAT_DIALOG_DATA) public data: any ) { }
  form! :FormGroup;
  numero! : string;
  x!:number;
  promotions : Promotion[]=[];
  promotions_Annee : Promotion[]=[];
  annees:annee_universitaire[]=[];
  id:any;
  boursier!:boolean;
  public countries:any = countries;

  ngOnInit(): void {
    this.initForm();
    this.getPromotions();
    this.getAnnees();
    this.fillForm();
  }

  initForm(): void {
    this.form = this.fb.group({
    
      nom:new FormControl(this.data.etudiant.nom ,[Validators.required,  Validators.pattern('^[a-zA-Z_]+'),Validators.minLength(3)]),
      prenom:new FormControl(this.data.etudiant.prenom, [Validators.required, Validators.pattern('^[a-zA-Z_]+'),Validators.minLength(3)]),
      AU: new FormControl(this.data.etudiant.annee),
      Promo: new FormControl(this.data.etudiant.promotion.promo),
      AE: new FormControl(this.data.etudiant.annee,[Validators.required]),
      boursier : new FormControl(this.data.etudiant.boursier),
      ppes : new FormControl(this.data.etudiant.ppes),
      tierTemps : new FormControl(this.data.etudiant.tierTemps),
      nationalite : new FormControl(this.data.etudiant.nationalite),
      tele : new FormControl(this.data.etudiant.tele,[Validators.pattern(/^(?:\+33|0)[1-9][0-9]{8}$/)])
      
    })
  }

    
  ChargerPromotions(){
    this.ps.getpromotionsByAnnee(this.f.AU.value).subscribe(
      data=>{
        this.promotions_Annee=data;
      }); 
  }

  getAnnees(){
    this.ps.getannees().subscribe(
      data=>{
        this.annees=data;      }
    , err => { console.log(err); });
  }

  get f (){ return this.form.controls }

  onAdd():void{
    let e : Etudiant;
    this.data.etudiant.nom=this.f.nom.value;
    this.data.etudiant.prenom=this.f.prenom.value;
    this.data.etudiant.ppes=this.f.ppes.value;
    this.data.etudiant.boursier=this.f.boursier.value;
    this.data.etudiant.tierTemps=this.f.tierTemps.value;
    this.data.etudiant.nationalite=this.f.nationalite.value;
    this.data.etudiant.tele=this.f.tele.value;

    console.log(this.data.etudiant)
    this.es.modifyEtudiant(this.data.etudiant).subscribe(
        data=> {
          console.log(data)
          this.toastr.success('Modifier Etudiant',"modification faite avec succés");    
         } , err => { console.log(err);}
       )
    

  }

 
  
  getPromotions(){
    
    this.ps.getpromotions().subscribe(
      data => {this.promotions=data;
        console.log(data)
      }, err => { console.log(err); });
  }

onSubmit() {}

  fillForm(){
  }
}
