import { Routes } from '@angular/router';


import { ExpansionComponent } from './expansion/expansion.component';
import { GestionDesAdministrateursComponent } from './gestion-des-administrateurs/gestion-des-administrateurs.component';
import { GestionDesEtudiantsComponent } from './gestion-des-etudiants/gestion-des-etudiants.component';
import { GestionDesMatieresComponent } from './gestion-des-matieres/gestion-des-matieres.component';
import { LoginComponent } from '../login/login.component';
import { IsSignedGuard } from '../guards/is-signed.guard';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NotesComponent } from './notes/notes.component';
import { ConfigurationsComponent } from './configurations/configurations.component';
import { RattrapageComponent } from './rattrapage/rattrapage.component';
import { NoteuniteComponent } from './notes/noteunite/noteunite.component';
import { AdmissionComponent } from './admission/admission.component';
import { StagesComponent } from './stages/stages.component';
import { NotematiereComponent } from './notes/notematiere/notematiere.component';
import { GestionMobiliteComponent } from './gestion-mobilite/gestion-mobilite.component';


export const MaterialRoutes: Routes = [
  {
    canActivate:[IsSignedGuard],
    path: 'gestionEtudiant',
    component: GestionDesEtudiantsComponent
  },
  {
    canActivate:[IsSignedGuard],
    path: 'Dashboard',
    component: DashboardComponent
  },
  {
    canActivate:[IsSignedGuard],
    path: 'gestionMatieres',
    component: GestionDesMatieresComponent
  },{
    canActivate:[IsSignedGuard],
    path: 'gestionDesNotes',
    component: NotesComponent
  },
  {
    canActivate:[IsSignedGuard],
    path: 'configurations',
    component: ConfigurationsComponent
  },

  {
    canActivate:[IsSignedGuard],
    path: 'gestionDesUtilisateurs',
    component: GestionDesAdministrateursComponent
  },
  {
    canActivate:[IsSignedGuard],
    path: 'gestionDesRattrapages',
    component: RattrapageComponent
  },
  {
    canActivate:[IsSignedGuard],
    path: 'admission',
    component: AdmissionComponent
  },
  {
    canActivate:[IsSignedGuard],
    path: 'note/note-unite/:sem/:code',
    component: NoteuniteComponent
  },
  {
    canActivate:[IsSignedGuard],
    path: 'note/note-matiere/:numero/:annee/:code/:uniteNote',
    component: NotematiereComponent
  },
  {
    canActivate:[IsSignedGuard],
    path: 'stages',
    component: StagesComponent
  },
  {
    canActivate:[IsSignedGuard],
    path: 'mobilite',
    component: GestionMobiliteComponent
  }
//topics/:id
 

];
