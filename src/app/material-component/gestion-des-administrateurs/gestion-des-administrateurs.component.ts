import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user';
import { UtilisateurService } from 'src/app/services/user.service';
import { AjouterutilisateurComponent } from './ajouterutilisateur/ajouterutilisateur.component';
declare const $:any;

@Component({
  selector: 'app-gestion-des-administrateurs',
  templateUrl: './gestion-des-administrateurs.component.html',
  styleUrls: ['./gestion-des-administrateurs.component.css']
})
export class GestionDesAdministrateursComponent implements OnInit, AfterViewInit {

  listData! : MatTableDataSource<any>;
  displayedColumns : string[] = ['id' , 'nom', 'nomutilisateur' ];
  dataSource!: MatTableDataSource<User>;
  @ViewChild(MatSort) sort! : MatSort;
  @ViewChild (MatPaginator) paginator! : MatPaginator;
  utilisateurs? : User[];
  constructor(private us: UtilisateurService,private dialog: MatDialog,) { }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.listerUtilisateurs();
  }

  listerUtilisateurs(){
    this.us.listeUtilisateurs().subscribe(data=> {
      console.log(data)
      this.utilisateurs=data;
      this.dataSource = new MatTableDataSource(this.utilisateurs);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    
    });
  }

  ajouter() {

    const DialogConfig = new MatDialogConfig();
    DialogConfig.autoFocus=true;
    // DialogConfig.width="60%";
    const dialogRef= this.dialog.open(AjouterutilisateurComponent,{
      width:'25%',
      height:'70%',
      panelClass:'custom-dialog',
      data:{
        
      }
    })
    dialogRef.afterClosed().subscribe(res=>{
      this.listerUtilisateurs()
    })
  }

}
