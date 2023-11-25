import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Unite } from 'src/app/models/unite';
import { EtudiantService } from 'src/app/services/etudiant.service';
import { NoteService } from 'src/app/services/note.service';
import { PromotionService } from 'src/app/services/promotion.service';
import { UniteService } from 'src/app/services/unite.service';

export interface NoteSemestreElement {
  nom: string;
  prenom: string;
  numero:number;
  moyenne:number;
  semestreLabel:string;
}

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit, AfterViewInit {

  
  constructor(private ps: PromotionService, private toastr:ToastrService,private es:EtudiantService,private notesr:NoteService) { }
  ngAfterViewInit(): void {
    $('#dt-mat-id').DataTable();
  }


  selectedYear:any;
  selectedPromotion: any;
  selectedSession: any;

  selectedValue!: string;
  selectedYearValue!: string;
  promotions: any[] = [];
  years: any[] = [];
  searchKey!: any;

  form! :FormGroup;
  unites:Unite[]=[];
  selectedFile!: File;
  file!: File;
  getvalue?: any;

  ExcelData: any;
  etudiantsOb?: Object[];
  promo?:any;
  annee?:any;
  listData! : MatTableDataSource<any>;
  displayedColumns : string[] = ['numero' , 'nom', 'prenom','code', 'note','actions' ];
  dataSource!: MatTableDataSource<Object>;
  @ViewChild(MatSort) sort! : MatSort;
  @ViewChild (MatPaginator) paginator! : MatPaginator;

  ngOnInit(): void {
    this.getAnnees();
    //this.getPromotions();
  }

  ListerEtudiants(promo:any,annee:any):void{
    
    this.notesr.listeNotesSemestre(promo,annee).subscribe(etuds => {
      this.etudiantsOb = etuds;
      console.log(etuds);

      this.etudiantsOb = etuds.map(([nom, prenom, numero, moyenne, semestreLabel]): NoteSemestreElement => ({
        nom,
        prenom,
        numero,
        moyenne,
        semestreLabel
      }) );

      
      
      this.dataSource = new MatTableDataSource(this.etudiantsOb);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

ddlChange(ob: any): void {
    const filterValue = ob.value;
    this.selectedYear = filterValue;
    this.getPromotions();
    this.ListerEtudiants(this.selectedPromotion, this.selectedYear)
  }

  ddlPromoChange(ob: any): void {
    const filterValue = ob.value;
    this.selectedPromotion = filterValue;
    this.ListerEtudiants(this.selectedPromotion, this.selectedYear)
  }

  ddlSessionChange(ob: any): void {
    const filterValue = ob.value;
    this.selectedSession = filterValue;
  }


  /**
   * Retourner les promotions
   */
  getPromotions() {
    this.ps.getpromotions().subscribe(
      data => {
        this.promotions = data;
        this.selectedPromotion = this.promotions[0];
        this.ListerEtudiants(this.selectedPromotion, this.selectedYear)
      }, err => { console.log(err); });
  }

  /**
   * Retourner les années 
   */
  getAnnees() {
    this.ps.getannees().subscribe(
      data => {
        this.years = data;
        this.selectedYear = this.years[0].annee;
        this.selectedSession='normale';
        this.getPromotions();
      },
      err => { console.log(err); }
    )
  }



  applyFilter() { 
    this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase(); 
  }

  onSearchClear() {
    this.searchKey = "";
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
    fd.append('session',this.selectedSession);
    // Envoi de la requête POST
    const res = this.es.importNotes(fd).subscribe(data => {
      
    }, err => { 
      if(err.status==200){
        this.ngOnInit();
        this.toastr.success('Importation avec Succées', 'La liste des notes est bien importée'); 
      }
      console.log(err); 
    });

    //console.log(res);
    
  }

  /**
   * Retourner toutes les unites
   */

  
}
