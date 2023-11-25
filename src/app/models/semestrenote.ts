export class SemestreNote implements Iterable<string> {
    nom: string;
    prenom: string;
    numero: number;
    moyenne:number;
    semestreLabel:string;
  
    constructor(nom: string, prenom: string, numero:number, moyenne:number, semestreLabel: string) {
      this.nom = nom;
      this.prenom = prenom;
      this.numero = numero;
      this.moyenne = moyenne;
      this.semestreLabel = semestreLabel;
    }
  
    *[Symbol.iterator](): Iterator<string> {
    
      yield this.nom;
      yield this.prenom;
      yield this.numero.toString();
      yield this.moyenne.toString();
      yield this.semestreLabel;
    }
  }