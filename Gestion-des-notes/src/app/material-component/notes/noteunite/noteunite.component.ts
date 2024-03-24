import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { EtudiantService } from 'src/app/services/etudiant.service';
import { NoteService } from 'src/app/services/note.service';
import { PromotionService } from 'src/app/services/promotion.service';
import { ModifierNoteComponent } from '../modifier-note/modifier-note.component';

export interface NoteUniteElement {
  nom: string;
  prenom: string;
  numero:number;
  moyenne:number;
  uniteLabel:string;
  idNote : string;
}

@Component({
  selector: 'app-noteunite',
  templateUrl: './noteunite.component.html',
  styleUrls: ['./noteunite.component.css']
})
export class NoteuniteComponent implements OnInit {

  selectedYear:any;
  selectedPromotion: any;
  selectedSession: any;

  promotions: any[] = [];
  years: any[] = [];
  searchKey!: any;

  etudiantsOb?: Object[];
  promo?:any;
  annee?:any;
  listData! : MatTableDataSource<any>;
  displayedColumns : string[] = ['numero' , 'nom', 'prenom','code', 'note','actions' ];
  dataSource!: MatTableDataSource<Object>;
  @ViewChild(MatSort) sort! : MatSort;
  @ViewChild (MatPaginator) paginator! : MatPaginator;
  
  constructor(private ps: PromotionService,private es:EtudiantService,private notesr:NoteService,private dialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAnnees();
  }

  ddlChange(ob: any): void {
    const filterValue = ob.value;
    this.selectedYear = filterValue;
    this.getPromotions();
    const sem = this.route.snapshot.paramMap.get('sem');
    const numero = this.route.snapshot.paramMap.get('code');
    this.ListerEtudiants(this.selectedPromotion, this.selectedYear, sem, numero)
  }

  ddlPromoChange(ob: any): void {
    const filterValue = ob.value;
    this.selectedPromotion = filterValue;
    const sem = this.route.snapshot.paramMap.get('sem');
    const numero = this.route.snapshot.paramMap.get('code');
    this.ListerEtudiants(this.selectedPromotion, this.selectedYear, sem, numero)
  }

  ddlSessionChange(ob: any): void {
    const filterValue = ob.value;
    this.selectedSession = filterValue;
  }


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

  getPromotions() {
    this.ps.getpromotions().subscribe(
      data => {
        this.promotions = data;
        this.selectedPromotion = this.promotions[0];
        const sem = this.route.snapshot.paramMap.get('sem');
        const numero = this.route.snapshot.paramMap.get('code');
        this.ListerEtudiants(this.selectedPromotion, this.selectedYear, sem, numero)

      }, err => { console.log(err); });
  }

  ListerEtudiants(promo:any,annee:any, sem:any, numero:any):void{
    
    this.notesr.listeNotesUnite(promo,annee, sem, numero).subscribe(etuds => {
      this.etudiantsOb = etuds;
      console.log(etuds);

      this.etudiantsOb = etuds.map(([nom, prenom, numero, moyenne, uniteLabel,idNote]): NoteUniteElement => ({
        nom,
        prenom,
        numero,
        moyenne,
        uniteLabel,
        idNote
      }) );

      this.dataSource = new MatTableDataSource(this.etudiantsOb);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }


  applyFilter() { 
    this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase(); 
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  onModify(note:any){
    console.log(note)
    const DialogConfig = new MatDialogConfig();
    DialogConfig.autoFocus=true;
    // DialogConfig.width="60%";
    const dialogRef= this.dialog.open(ModifierNoteComponent,{
      width:'45%',
      height:'30%',
      panelClass:'custom-dialog',
      data:{
        note
      }
    })
    dialogRef.afterClosed().subscribe(res=>
      {      
        this.ListerEtudiants(this.selectedPromotion, this.selectedYear,  this.route.snapshot.paramMap.get('sem'),  this.route.snapshot.paramMap.get('code'))
      })
  }
  
}
