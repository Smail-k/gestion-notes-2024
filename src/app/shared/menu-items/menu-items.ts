import { Injectable } from '@angular/core';


export interface BadgeItem {
  type: string;
  value: string;
}
export interface Saperator {
  name: string;
  type?: string;
}
export interface SubChildren {
  state: string;
  name: string;
  type?: string;
}
export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
  child?: SubChildren[];
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  saperator?: Saperator[];
  children?: ChildrenItems[];
  interfacage?: string;
}


const MENUITEMS = [
  { state: 'dashboard', name: 'Dashboard', type: 'link2', icon: 'av_timer' },
  
  // {
  //   state: 'gestionUE', // i.e dashboard
  //   name: 'Gestion des UE', // i.e Dashboard
  //   type: 'sub', // i.e sub // sub, link, seprator
  //   icon: 'web', // i.e av_timer
  //   children: [
  //     {

  //       state: 'ImporterUE', // i.e dashboard1
  //       name: 'Importer Excell', // i.e Dashboard 1
  //       icon: 'cloud_upload',
  //     },
  //     {
  //       state: 'gestionUE', // i.e dashboard2
  //       name: 'Gérer UE', // i.e Dashboard 2
  //       icon: 'web'
  //     }
  //   ]
  // },
  // {
  //   state: 'gestionEtudiant', // i.e dashboard
  //   name: 'Gestion des etudiants', // i.e Dashboard
  //   type: 'sub', // i.e sub // sub, link, seprator
  //   icon: 'view_comfy', // i.e av_timer
  //   children: [
  //     {

  //       state: 'gestionEtudiant', // i.e dashboard1
  //       name: 'Importer Excell', // i.e Dashboard 1
  //       icon: 'cloud_upload',
  //     },
  //   ]
  // },
  { state: 'gestionEtudiant', type: 'link2', name: 'Gestion des étudiants', icon: 'person', },
  { state: 'gestionMatieres', type: 'link2', name: 'Gestion des UE', icon: 'book', },
  { state: 'gestionDesNotes', type: 'link2', name: 'Gestion des Notes', icon: 'view_list', },
  {state : 'stages',type : "link2",name:'Gestion des stages',icon : 'book' },
  { state: 'gestionDesRattrapages', type: 'link2', name: 'Rattrapages', icon: 'view_list', },
  { state: 'admission', type: 'link2', name: 'Admission', icon: 'view_list', },
  { state: 'configurations', type: 'link2', name: 'Configuration', icon: 'settings', },
  { state: 'gestionDesUtilisateurs', type: 'link2', name: 'Gestion des utilisateurs', icon: 'supervised_user_circle', },

];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
