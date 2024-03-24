import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Stage } from 'src/app/models/stage';
import { EtudiantService } from 'src/app/services/etudiant.service';
import { NoteService } from 'src/app/services/note.service';
import { PromotionService } from 'src/app/services/promotion.service';
import { StageService } from 'src/app/services/stage.service';

@Component({
  selector: 'app-list-stages',
  templateUrl: './list-stages.component.html',
  styleUrls: ['./list-stages.component.css']
})
export class ListStagesComponent implements OnInit {

  stages?: Stage[];
  promotions: any[] = [];
  years: any[] = [];
  searchKey!: any;

  listData! : MatTableDataSource<any>;
  displayedColumns : string[] = ['numero' , 'societe','convention', 'duree','annee','dateDebut','dateFin','description'];
  dataSource!: MatTableDataSource<Stage>;
  @ViewChild(MatSort) sort! : MatSort;
  @ViewChild (MatPaginator) paginator! : MatPaginator;
  
  constructor(private ps: PromotionService,private stageService:StageService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.getAnnees();
    this.stageService.getEtudiantStage(this.data.numero).subscribe(res=>{
      //this.stages=res;
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  getAnnees() {
    this.ps.getannees().subscribe(
      data => {
        this.years = data;
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



}
