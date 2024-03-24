import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { EtudiantService } from 'src/app/services/etudiant.service';
import { NoteService } from 'src/app/services/note.service';
import { PromotionService } from 'src/app/services/promotion.service';
import { NoteUniteElement } from '../noteunite/noteunite.component';

interface noteMatiere{
  numero : string;
  nom : string;
  prenom : string;
  label : string;
  note : string;
}


@Component({
  selector: 'app-notematiere',
  templateUrl: './notematiere.component.html',
  styleUrls: ['./notematiere.component.css']
})
export class NotematiereComponent implements OnInit {

  selectedYear:any;
  selectedPromotion: any;
  selectedSession: any;
  uniteNote!: any;

  promotions: any[] = [];
  years: any[] = [];
  searchKey!: any;

  etudiantsOb?: Object[];
  promo?:any;
  annee?:any;
  listData! : MatTableDataSource<any>;
  displayedColumns : string[] = ['numero' , 'nom', 'prenom','label','note'];
  dataSource!: MatTableDataSource<Object>;
  @ViewChild(MatSort) sort! : MatSort;
  @ViewChild (MatPaginator) paginator! : MatPaginator;
  
  constructor(private ps: PromotionService,private es:EtudiantService,private notesr:NoteService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAnnees();
    this.uniteNote= this.route.snapshot.paramMap.get('uniteNote');
  }

  ddlChange(ob: any): void {
    const filterValue = ob.value;
    this.selectedYear = filterValue;
    this.getPromotions();
    const code = this.route.snapshot.paramMap.get('code');
    const numero = this.route.snapshot.paramMap.get('numero');
    const annee = this.route.snapshot.paramMap.get('annee');
    this.ListerEtudiants(annee, code, numero)
  }

  ddlPromoChange(ob: any): void {
    const filterValue = ob.value;
    this.selectedPromotion = filterValue;
    const code = this.route.snapshot.paramMap.get('code');
    const numero = this.route.snapshot.paramMap.get('numero');
    const annee = this.route.snapshot.paramMap.get('annee');
    this.ListerEtudiants(annee, code, numero)
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
        const code = this.route.snapshot.paramMap.get('code');
        const numero = this.route.snapshot.paramMap.get('numero');
        const annee = this.route.snapshot.paramMap.get('annee');
        this.ListerEtudiants(annee, code, numero)

      }, err => { console.log(err); });
  }

  ListerEtudiants(annee:any, code:any, numero:any):void{
    
    this.notesr.listeNotesMatiere(code,annee, numero).subscribe(etuds => {
      this.etudiantsOb = etuds;
      this.etudiantsOb = etuds.map(([numero,nom, prenom, label, note]): noteMatiere => ({
        numero,
        nom,
        prenom,
        label,
        note
      }) );

      console.log(this.etudiantsOb);


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



}
