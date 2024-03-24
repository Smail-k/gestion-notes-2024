import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Matiere } from 'src/app/models/matiere';
import { EtudiantService } from 'src/app/services/etudiant.service';
import { PromotionService } from 'src/app/services/promotion.service';
import { UniteService } from 'src/app/services/unite.service';
declare const $:any;

interface Promotion {
  value: string;
  viewValue: string;
}

interface UnivYear {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-gestion-des-matieres',
  templateUrl: './gestion-des-matieres.component.html',
  styleUrls: ['./gestion-des-matieres.component.css']
})
export class GestionDesMatieresComponent implements OnInit, AfterViewInit {

  constructor(private ps:PromotionService,private us:UniteService,private toastr:ToastrService,private es:EtudiantService,) { }
  ngAfterViewInit(): void {
    $('#dt-mat-id').DataTable();
  }
  selectedFile!: File;
  selectedValue!: string;
  selectedYearValue!: string;
  promotions: any[]=[];
  years: any[]=[];
  matieres : Matiere[]=[];
  searchKey!:any;
  listData! : MatTableDataSource<any>;
  displayedColumns : string[] = ['unite','uniteCoefficient','code', 'libelle','coefficient','semestre' ];
  @ViewChild(MatSort) sort! : MatSort;
  @ViewChild (MatPaginator) paginator! : MatPaginator;
  dataSource!: MatTableDataSource<Matiere>;
  file!: File;
  selectedSemester !: string;


  ngOnInit(): void {
   this.getAnnees(); 
   this.getPromotions();
   this.getMatieres(); 
  }

  getMatieres():void{
    this.us.listeMatiere().subscribe(
      data=> {
        this.matieres=data; 
        this.dataSource = new MatTableDataSource(this.matieres);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    )
  }
  
  /**
   * Retourner les promotions
   */
  getPromotions(){
    this.ps.getpromotions().subscribe(
      data => {this.promotions=data;
      }, err => { console.log(err); });
  }

  /**
   * Retourner les années 
   */
  getAnnees(){
    this.ps.getannees().subscribe(
      data => { this.years=data;
        
      } , 
      err => { console.log(err);}
    )
  }

applyFilter(){this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase(); }
  
onSearchClear(){
  this.searchKey="";
  this.applyFilter();
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
    this.es.importModules(fd).subscribe(data => {
    }, err => { console.log(err); });
    if (this.file.name =='exemple_maquette_1.xlsx')
    this.toastr.success('La liste des modules est bien importée', ' Importation avec Succées'); 
    else 
    this.toastr.error(" Veuillez choisir le fichier convenable","Importation imopssible");
  }

  onSemChange():void{
    if(this.selectedSemester=="")
      this.getMatieres();
    else 
    this.us.matieresBySem(this.selectedSemester).subscribe(
      data=> {
        this.matieres=data; 
        this.dataSource = new MatTableDataSource(this.matieres);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    )
  }
}
