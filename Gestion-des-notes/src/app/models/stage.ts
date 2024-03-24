export interface Stage {

    id? : number;
	duree : number,
	societe :string, 
	description ?: string;
	annee ?:string;
	dateDebut : string,
	dateFin : string,
	numConvention : string,
	etudiant : {
        numero : string
    };  

}