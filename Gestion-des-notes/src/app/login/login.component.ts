import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { OauthServiceService } from '../services/oauth-service.service';
import { UtilisateurService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  /* Les déclarations */
  
  email: any;
  password!: string;
  return: string = '';
  expiration!:any
  hide = true;
  user: any;
  canAcess:boolean=true;
  roleAs!: any;
  id!:any;
  public form: FormGroup = Object.create(null);
  helper = new JwtHelperService



  
  constructor(
  private fb: FormBuilder,
  private os : OauthServiceService,
  private router: Router,
  private route: ActivatedRoute,
  ){}
  
  
  ngOnInit(): void 
  {
  this.initForm()
  // Get the query params
  this.route.queryParams.subscribe(params => this.return = params['return'] || '/dashboard');
  }
  
  
  /* Les fonctions */
  
  get f() 
  {
  return this.form.controls;
  }
  
  
  initForm()
  {
  localStorage.clear()
  this.form = this.fb.group({
  uname: [null, Validators.compose([Validators.required])],
  password: [null, Validators.compose([Validators.required])],
  });
  
  }
 
  
  onSubmit() 
  {
  
  let username=this.f.uname.value;
  let password=this.f.password.value
  this.os.authenticate(username,password).subscribe(res=>
    {
      //Username et password correcte 

      localStorage.setItem('at',res["access token"])
      localStorage.setItem('rt',res["refresh token"])
      localStorage.setItem('name',username);
      const decodeToken=this.helper.decodeToken(res.access_token);
      this.router.navigateByUrl(this.return);
    }
    //Username et password incorrecte 
      ,(err : any) => {
      this.canAcess=false
    })
    
    }
  
  
  
  
  }