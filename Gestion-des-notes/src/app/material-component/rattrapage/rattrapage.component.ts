import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Etudiant } from 'src/app/models/etudiant';
import { EtudiantRattrapage } from 'src/app/models/etudiant_rattrapage';
import { EtudiantService } from 'src/app/services/etudiant.service';
import { NoteService } from 'src/app/services/note.service';
import { PromotionService } from 'src/app/services/promotion.service';

export interface MatiereToCompose {
  intitule: string;
}

@Component({
  selector: 'app-rattrapage',
  templateUrl: './rattrapage.component.html',
  styleUrls: ['./rattrapage.component.css']
})
export class RattrapageComponent implements OnInit {

  promotions: any[] = [];
  years: any[] = [];
  searchKey!: any;
  selectedYear:any;
  etudiantsOb?: EtudiantRattrapage[];
  selectedPromotion: any;
  selectedSession: any;

  listData! : MatTableDataSource<any>;
  displayedColumns : string[] = ['numero' , 'nom', 'prenom','actions' ];
  dataSource!: MatTableDataSource<Object>;
  @ViewChild(MatSort) sort! : MatSort;
  @ViewChild (MatPaginator) paginator! : MatPaginator;
  
  constructor(private dialog: MatDialog,private ps: PromotionService, private toastr:ToastrService,private es:EtudiantService,private notesr:NoteService) { }

  ngOnInit(): void {
    this.getAnnees();
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
        this.ListerEtudiants(this.selectedYear,this.selectedPromotion)
      }, err => { console.log(err); });
  }


  ddlChange(ob: any): void {
    const filterValue = ob.value;
    this.selectedYear = filterValue;
    this.getPromotions();
    this.ListerEtudiants(this.selectedYear,this.selectedPromotion)
  }

  ddlPromoChange(ob: any): void {
    const filterValue = ob.value;
    this.selectedPromotion = filterValue;
    this.ListerEtudiants(this.selectedYear, this.selectedPromotion)
  }

  ddlSessionChange(ob: any): void {
    const filterValue = ob.value;
    this.selectedSession = filterValue;
  }

  ListerEtudiants(annee:any, promo:any):void{
    this.notesr.listeEtudiantRattrapagee(annee,promo).subscribe(etuds => {
      this.etudiantsOb = etuds;
      this.dataSource = new MatTableDataSource(this.etudiantsOb);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }


  applyFilter() { 
    //this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase(); 
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }



  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(RattrapageDialogContentComponent, {
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
    if (result.event === 'Add') {
      //this.addRowData(result.data);
    } else if (result.event === 'Update') {
      //this.updateRowData(result.data);
    } else if (result.event === 'Delete') {
      //this.deleteRowData(result.data);
    }
  });
}



}


@Component({
  // tslint:disable-next-line - Disables all
  selector: 'app-dialog-content',
  templateUrl: 'dialog-content.html',
})
// tslint:disable-next-line - Disables all
export class RattrapageDialogContentComponent implements OnInit {
  action: string;
  matiereData?: String[];
  dataSource!: MatTableDataSource<String>;
  displayedColumns : string[] = ['nom'];
  @ViewChild(MatSort) sort! : MatSort;
  @ViewChild (MatPaginator) paginator! : MatPaginator;
  local_data: any;
 

  ngOnInit(): void {
    this.listerMatiere(); 
  }

  constructor(
    public dialogRef: MatDialogRef<RattrapageDialogContentComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: EtudiantRattrapage
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

  listerMatiere(){
    this.matiereData = this.local_data.matiereRatts;
    this.dataSource = new MatTableDataSource(this.matiereData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    console.log(this.dataSource);
  }
  
  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

}
