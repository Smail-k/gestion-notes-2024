import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Mobilite } from 'src/app/models/mobilite';
import { MobiliteService } from 'src/app/services/mobilite.service';

@Component({
  selector: 'app-mobilite',
  templateUrl: './mobilite.component.html',
  styleUrls: ['./mobilite.component.css']
})
export class MobiliteComponent implements OnInit {

  form!: FormGroup;
  mobilite !:Boolean;
  constructor(private formBuilder: FormBuilder,private service : MobiliteService,@Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit() {
    this.mobilite=this.data.mobilite?.pays!= undefined;
    this.form = this.formBuilder.group({
      pays: [this.data.mobilite?.pays!= undefined ? this.data.mobilite?.pays : '', Validators.required],
      ville: [this.data.mobilite?.ville!= undefined ? this.data.mobilite?.ville : '', Validators.required],
      nbrSem: [this.data.mobilite?.nbrSem!= undefined ? this.data.mobilite?.nbrSem : '', Validators.required],
      type: [this.data.mobilite?.type!= undefined ? (this.data.mobilite?.type=="etude" ? '1' : this.data=="stage" ? "2" : "3")  : '', Validators.required],
      societe: [this.data.mobilite?.societe!= undefined ? this.data.mobilite?.societe : ''],
      duree: [this.data.mobilite?.duree!= undefined ? this.data.mobilite?.duree : '', Validators.required],
      dateDepart: [this.data.mobilite?.dateDepart!= undefined ? this.data.mobilite?.dateDepart : '', Validators.required],
      dateRetour: [this.data.mobilite?.dateRetour!= undefined ? this.data.mobilite?.dateRetour : '', Validators.required],
      note: [this.data.mobilite?.note!= undefined ? this.data.mobilite?.note : '', Validators.required],
      description: [this.data.mobilite?.description!= undefined ? this.data.mobilite?.description : ''],
      annee: [this.data.mobilite?.annee!= undefined ? this.data.mobilite?.annee.annee : '', Validators.required],
    });
  }
  get f (){ return this.form.controls }

  onAdd(){
    let mobilite : Mobilite={
      pays : this.f.pays.value,
      ville : this.f.ville.value,
      nbrSem : this.f.nbrSem.value,
      etudiant : { numero : this.data.numero },
      description : this.f.description.value,
      societe : this.f.societe.value,
      dateDepart : this.f.dateDepart.value,
      dateRetour : this.f.dateRetour.value,
      annee : this.f.annee.value,
      type : this.f.type.value
    };
    console.log(mobilite)
    this.service.addMobilite(mobilite).subscribe(res=>{
      //console.log("hnaa--------------");
    });
  }

}
