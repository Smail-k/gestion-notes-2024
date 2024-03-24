import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, OnDestroy, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import DataTables from 'datatables.net';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

import { Etudiant } from 'src/app/models/etudiant';
import { Promotion } from 'src/app/models/promotion';
import { EtudiantService } from 'src/app/services/etudiant.service';
import { PromotionService } from 'src/app/services/promotion.service';
import { UtilisateurService } from 'src/app/services/user.service';
import { AjouteretudiantComponent } from './ajouteretudiant/ajouteretudiant.component';
import { SupprimerEtudiantComponent } from './supprimer-etudiant/supprimer-etudiant.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { annee_universitaire } from 'src/app/models/annee_universitaire';
import { MobiliteComponent } from './mobilite/mobilite.component';
import { ModifierEtudiantComponent } from './modifier-etudiant/modifier-etudiant.component';

@Component({
  selector: 'app-gestion-des-etudiants',
  templateUrl: './gestion-des-etudiants.component.html',
  styleUrls: ['./gestion-des-etudiants.component.css']
})
export class GestionDesEtudiantsComponent implements OnInit {
  ExcelData: any;
  etudiants?: Etudiant[];
  selectedValue!: string;
  selectedYearValue!: string;
  selectedFile!: File;
  file!: File;
  promotions: any[]=[];
  years: any[]=[];
  annees:annee_universitaire[]=[];
  promo?:any;
  champs:boolean=true;
  annee?:any;
  listData! : MatTableDataSource<any>;
  displayedColumns : string[] = ['numero' , 'nom', 'prenom','actions' ];
  dataSource!: MatTableDataSource<Etudiant>;
  showForm !:boolean;
  @ViewChild(MatSort) sort! : MatSort;
  @ViewChild (MatPaginator) paginator! : MatPaginator;
  form!:FormGroup;
  promotions_Annee : Promotion[]=[];
  constructor(private HttpClient: HttpClient,private dialog: MatDialog,
     private us: UtilisateurService, private etuService: EtudiantService,private promService:PromotionService, 
     private toastr:ToastrService,
    private fb:FormBuilder) { }


     initForm(): void {
      this.form = this.fb.group({
      selectedPromotion:new FormControl('' ,[Validators.required]),
      anneeU:new FormControl('', [Validators.required,Validators.pattern('^[0-9]{4}\/[0-9]{4}')]),
      promoSel:new FormControl('' ,[]),
      anneeSel:new FormControl('' ,[]),
      searchKey:new FormControl('' ,[]),


      
    })}
  
    get f (){ return this.form.controls }

  ngOnInit(): void {
   this.getPromotions();
   this.ListerEtudiants()
   this.initForm();
   this.getAnnees();
  }

  onShowForm(){
    this.showForm=!this.showForm;
  }
  getAnnees(){
    this.promService.getannees().subscribe(
      data=>{
        this.annees=data;      }
    , err => { console.log(err); });
  }

  
  /**
   * 
   * @param event 
   */
  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
    // Récupération du fichier Excel
    this.file = event.target.files[0];
    const fd = new FormData();
    fd.append('file', this.file);
    // Envoi de la requête POST
    fd.append('promo',this.f.selectedPromotion.value);
    fd.append('annee',this.f.anneeU.value);

    this.etuService.importEtudiants(fd).subscribe(() => {
    this.toastr.success('Importation avec Succées', 'La liste des Etudiant est bien importée'); 
    }, err => {     this.toastr.success('Importation avec Succées', 'La liste des Etudiant est bien importée'); 
    console.log(err); });
    
  }

  /**
   * Lister tous les etudiants sans filtre
   */
  ListerEtudiants():void{
    this.etuService.Alletudiant().subscribe(etuds => {
      this.etudiants = etuds;
      this.dataSource = new MatTableDataSource(this.etudiants);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    
  }

  applyFilter(){this.dataSource.filter = this.f.searchKey.value.trim().toLocaleLowerCase(); }
  
  
  ChargerPromotions(){
    this.promService.getpromotionsByAnnee(this.f.anneeSel.value).subscribe(
      data=>{
        this.promotions_Annee=data;
      }); 
  }
  

  /**
   * Retourner les promotions
   */
  getPromotions(){
    
    this.promService.getpromotions().subscribe(
      data => {this.promotions=data;
      }, err => { console.log(err); });
  }


  ListerEtudiantFiltrer(){

  console.log("promo est"+this.f.promoSel.value)
  console.log("Anne est "+this.f.anneeSel.value)
  
      this.etuService.listeEtudiant(this.f.promoSel.value,this.f.anneeSel.value).subscribe(etuds => {
        console.log(etuds);
        this.etudiants = etuds;
        this.dataSource = new MatTableDataSource(this.etudiants);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    
    
  }



  /**
   * 
   * @param etudiant : represente l'etudiant quand va supprimer
   */
delete(etudiant:any) 
{
  this.toastr.warning("Attention vous allez supprimer un étudiant!!")
  const DialogConfig = new MatDialogConfig();
    DialogConfig.autoFocus=true;
    const dialogRef= this.dialog.open(SupprimerEtudiantComponent,
      {
      width:'20%',
      height:'20%',
      panelClass:'custom-dialog',
      data:{etudiant}    })
    dialogRef.afterClosed().subscribe(res=>
      {      //this.ListerEtudiants("Annee4","2021/2022") 
      })
}

 
ajouter() {

  const DialogConfig = new MatDialogConfig();
  DialogConfig.autoFocus=true;
  // DialogConfig.width="60%";
  const dialogRef= this.dialog.open(AjouteretudiantComponent,{
    width:'25%',
    height:'89%',
    panelClass:'custom-dialog',
    data:{
      
    }
  })
  dialogRef.afterClosed().subscribe(res=>{
   // this.ListerEtudiants("Annee4","2021/2022")
  })
}

modifier(etudiant : Etudiant){
  console.log(etudiant)
  const DialogConfig = new MatDialogConfig();
  DialogConfig.autoFocus=true;
  // DialogConfig.width="60%";
  const dialogRef= this.dialog.open(ModifierEtudiantComponent,{
    width:'45%',
    height:'89%',
    panelClass:'custom-dialog',
    data:{
      etudiant
    }
  })
 
}

mobilite(etudiant : any){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus=true;
  console.log(etudiant)
  const dialogRef=this.dialog.open(MobiliteComponent,{
    width : '45%',
    height : '89%',
    panelClass : 'custom-dialog',
    data : {
      numero : etudiant.numero,
      mobilite : etudiant.mobilite
    }
  })
  
}

onSubmit() {console.warn(this.form.value);}

  

}
