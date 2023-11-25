import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Configuration } from 'src/app/models/configuration';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-ajouterconfiguration',
  templateUrl: './ajouterconfiguration.component.html',
  styleUrls: ['./ajouterconfiguration.component.css']
})
export class AjouterconfigurationComponent implements OnInit {

  constructor(private fb: FormBuilder ,private toastr:ToastrService, private es:ConfigurationService) { }

  form! :FormGroup;
  seuil! : number;
  x!:number;
  
  ngOnInit(): void {
    this.initForm();
    //this.ongetNumero();
  }

  initForm(): void {
    this.form = this.fb.group({
    libelle:new FormControl('' ,[Validators.required,  Validators.pattern('^[a-zA-Z_]+'),Validators.minLength(3)]),
    seuil:new FormControl('', [Validators.required, Validators.pattern('^[0-9]+\.[0-9]+') ]),
    description:new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z_ ]+'),Validators.minLength(10),Validators.maxLength(100)]),

  })}

  onAdd():void{
    // this.es.addEtudiant().subscribe
    let configure:Configuration={};
    configure.id =1;
    configure.seuil = this.f.seuil.value; 
    configure.libelle = this.f.libelle.value;
    configure.description = this.f.description.value;
   
    this.es.addConfiguration(configure).subscribe(
     data=> {
      this.toastr.success('Nouvelle configuration ',"L'ajout à été effectuée avec succés"); 
     } , err => { console.log(err);
      this.toastr.error("Une erreur s'est produite", "Impossible d'inserer")
     }
    )


  }


  get f (){ return this.form.controls }
  onSubmit() {console.warn(this.form.value);}

}
