import { Component, OnInit, ViewChild } from '@angular/core';
import { MobiliteComponent } from '../gestion-des-etudiants/mobilite/mobilite.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AjouteretudiantComponent } from '../gestion-des-etudiants/ajouteretudiant/ajouteretudiant.component';
import { SupprimerEtudiantComponent } from '../gestion-des-etudiants/supprimer-etudiant/supprimer-etudiant.component';
import { MatTableDataSource } from '@angular/material/table';
import { Etudiant } from 'src/app/models/etudiant';
import { annee_universitaire } from 'src/app/models/annee_universitaire';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Promotion } from 'src/app/models/promotion';
import { HttpClient } from '@angular/common/http';
import { EtudiantService } from 'src/app/services/etudiant.service';
import { PromotionService } from 'src/app/services/promotion.service';
import { UtilisateurService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { AjouterStageComponent } from './ajouter-stage/ajouter-stage.component';
import { ListStagesComponent } from './list-stages/list-stages.component';

@Component({
  selector: 'app-stages',
  templateUrl: './stages.component.html',
  styleUrls: ['./stages.component.css']
})
export class StagesComponent implements OnInit {

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
    }, err => {     this.toastr.error("Une erreur s'est produite","Importation imopssible");
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


stage(etudiant : any){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus=true;
  console.log(etudiant)
  const dialogRef=this.dialog.open(AjouterStageComponent,{
    width : '50%',
    height : '100%',
    panelClass : 'custom-dialog',
    data : {
      etudiant : etudiant,
    }
  })
  
}

listeStages(numero : string){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus=true;
  const dialogRef=this.dialog.open(ListStagesComponent,{
    width : '80%',
    height : '60%',
    panelClass : 'custom-dialog',
    data : {
      numero,
    }
  })
  
}

onSubmit() {console.warn(this.form.value);}


}
