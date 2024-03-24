import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Configuration } from 'src/app/models/configuration';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-delete-configuration',
  templateUrl: './delete-configuration.component.html',
  styleUrls: ['./delete-configuration.component.css']
})
export class DeleteConfigurationComponent implements OnInit {


  configurations : Configuration[]=[];
 
  constructor(public dialogRef: MatDialogRef<DeleteConfigurationComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private toastr: ToastrService, 
    private cs: ConfigurationService
  ) { }
 
  ngOnInit(): void {
  }
 
  
closeDialog() {this.dialogRef.close(false);
this.toastr.info("Vous avez annuler l'opération");
}

/**
 * Supprimer Etudiant
 */
onDeleteConfiguration()
{
  // this.cs.DeleteConfiguration(this.data.configuration.id).subscribe(
  //   data=> {
  //     this.toastr.success('Suppression avec Succées', 'Suppression configuration'); 
  //     window.location.reload();
  //     this.ListerConfigurations();
  //   }
  // )
}

/**
 * Lister etudiants
 */
ListerConfigurations(){
  this.cs.listeConfiguration().subscribe(
    data=>{
      this.configurations=data;
    }
  )

}
}