import { Promotion } from "./promotion";

export class Etudiant {
    id?: number;
    nom?:string;
    prenom?:string;
    annee?:string;
    numero?:string;
    promotion_id?:Promotion; 
    mobilite?:any;
}
