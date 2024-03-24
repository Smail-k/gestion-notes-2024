import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, OnDestroy, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import DataTables from 'datatables.net';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Configuration } from 'src/app/models/configuration';

import { Etudiant } from 'src/app/models/etudiant';
import { Promotion } from 'src/app/models/promotion';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { EtudiantService } from 'src/app/services/etudiant.service';
import { PromotionService } from 'src/app/services/promotion.service';
import { UtilisateurService } from 'src/app/services/user.service';
import { AjouterconfigurationComponent } from './ajouterconfiguration/ajouterconfiguration.component';
import { DeleteConfigurationComponent } from './delete-configuration/delete-configuration.component';

// import { AjouteretudiantComponent } from './ajouteretudiant/ajouteretudiant.component';
// import { SupprimerEtudiantComponent } from './supprimer-etudiant/supprimer-etudiant.component';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.css']
})
export class ConfigurationsComponent implements OnInit {
  ExcelData: any;
  searchKey!:any;
  configurations?: Configuration[];
  selectedValue!: string;
  selectedYearValue!: string;
  selectedFile!: File;
  file!: File;
  promotions: any[]=[];
  years: any[]=[];
  promo?:any;
  annee?:any;
  listData! : MatTableDataSource<any>;
  displayedColumns : string[] = ['id' , 'libelle', 'seuil','description','actions'];
  dataSource!: MatTableDataSource<Configuration>;
  @ViewChild(MatSort) sort! : MatSort;
  @ViewChild (MatPaginator) paginator! : MatPaginator;


  constructor(private HttpClient: HttpClient,private dialog: MatDialog,
     private confService: ConfigurationService, 
     private toastr:ToastrService) { }


  ngOnInit(): void {
  
   this.ListerConfigurations()
  }

 

  /**
   * Lister tous les etudiants sans filtre
   */
  ListerConfigurations():void{
   

    this.confService.listeConfiguration().subscribe(conf => {
      this.configurations = conf;
      this.dataSource = new MatTableDataSource(this.configurations);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(){this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase(); }
  
  onSearchClear(){
    this.searchKey="";
    this.applyFilter();
  }


 
ajouter() {

  const DialogConfig = new MatDialogConfig();
  DialogConfig.autoFocus=true;
  // DialogConfig.width="60%";
    const dialogRef= this.dialog.open(AjouterconfigurationComponent,{
    width:'25%',
    height:'70%',
    panelClass:'custom-dialog',
    data:{
      
    }
  }) 
  dialogRef.afterClosed().subscribe(res=>{
    this.ListerConfigurations()
  })
}
  
delete(configuration:any) 
{
  this.toastr.warning("Attention vous allez supprimer une configuration !!")
  const DialogConfig = new MatDialogConfig();
    DialogConfig.autoFocus=true;
    const dialogRef= this.dialog.open(DeleteConfigurationComponent,
      {
      width:'20%',
      height:'20%',
      panelClass:'custom-dialog',
      data:{configuration}    })
    dialogRef.afterClosed().subscribe(res=>
      {      
      })
}


  

}
