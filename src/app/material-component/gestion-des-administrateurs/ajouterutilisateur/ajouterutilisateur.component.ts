import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UtilisateurService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ajouterutilisateur',
  templateUrl: './ajouterutilisateur.component.html',
  styleUrls: ['./ajouterutilisateur.component.css']
})
export class AjouterutilisateurComponent implements OnInit {
  hide = true;
  form! : FormGroup;
  usernamefound!:any;
  notfound: boolean=false;
  constructor( private fb: FormBuilder,private us:UtilisateurService,private toastr:ToastrService ) { this.initForm(); }

  ngOnInit(): void {
  }

  initForm(): void {
    this.form = this.fb.group({
    nom:new FormControl('' ,[Validators.required,  Validators.pattern('^[a-zA-Z_]+'),Validators.minLength(3)]),
    pwd: new FormControl('',[Validators.required, Validators.minLength(8) ]),
    username:new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$'),Validators.minLength(3)])
    
  })

}

get f (){ return this.form.controls }
onSubmit() {console.warn(this.form.value);}
onAdd(){
let User:User={} ; 
User.name = this.f.nom.value;
User.username = this.f.username.value; 
User.password = this.f.pwd.value;
User.role='admin';
this.us.addUtilisateur(User).subscribe(data=>
  { 
    this.toastr.success('Ajout avec succés',"L'utilisateur à été ajouté avec succés"); }
)
}

ChercherUsername(username:string){
  this.us.userExist(username)
.subscribe((data: any) => {
  this.notfound= data;
});
}

}
