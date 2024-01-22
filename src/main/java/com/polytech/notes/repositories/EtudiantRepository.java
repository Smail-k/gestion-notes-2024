package com.polytech.notes.repositories;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.polytech.notes.models.Etudiant;
import com.polytech.notes.models.Note;
import com.polytech.notes.models.Promotion;

public interface EtudiantRepository extends JpaRepository<Etudiant, Long>{

	@Transactional
	@Modifying
	void deleteEtudiantByNumero(String numero);
	Etudiant getEtudiantByNumero(String numero);
	Etudiant findEtudiantByNumeroAndNotesAnnee(String numero,String annee);
	Etudiant findEtudiantByNomAndNotesAnnee(String nom,String annee);
	Etudiant getEtudiantByNomAndPrenom(String nom,String prenom);
	@Query("select e.notes from Etudiant e where e.nom=:nom and e.prenom=:prenom and e.promotion.annee.annee=:annee")
	List<Note> getEtudiantByPromotionAndAnneeUniv(String nom,String prenom,String annee);
	 
	@Query("select e from Etudiant e where e.promotion.promo=:p AND e.promotion.annee.annee=:annee")
	List<Etudiant> getEtudiantsByPromotion(String p,String annee);
	
	@Query("select e from Etudiant e where e.promotion.promo=:p AND e.promotion.annee.annee=:annee and e.numero=:numero")
	Etudiant getEtudiantByPromotion(String p,String annee,String numero);
	//List<Etudiant> findEtudiantsByPromotionAndAnnee(Promotion p,String annee);
	List<Etudiant> findEtudiantByPromotionPromoAndNotesAnneeAndNotesSituation(String promo,String annee,boolean situation);
	
	@Query("select e.nom,e.prenom,e.numero,n.note,u.code from Etudiant e join e.notes n join n.unite u where n.matiere is NULL AND"
			+ " e.promotion.promo=:promo AND e.promotion.annee.annee=:annee")// AND n.annee=:annee
	List<Object[]> getListeEtudiantsMoyennesModules(String promo,String annee);
	
	@Query("select e.nom,e.prenom,e.numero,n.note,u.code,n.id from Etudiant e join e.notes n join n.unite u where n.matiere is NULL AND"
			+ " u.semestre.nom=:sem AND e.numero=:numero AND "
			+ "e.promotion.promo=:promo AND e.promotion.annee.annee=:annee")// AND n.annee=:annee
	List<Object[]> getEtudiantMoyennesModulesBySem(String promo,String annee,String sem,String numero);
	
	@Query("select distinct e.annee.annee from Etudiant e")
	List<String> findAnneeUniversitaires();
	
	@Query("select distinct promotion from Etudiant")
	List<String> findPromotions();
	
	@Query("select max(numero) from Etudiant")
	String findLastNumero();
	
	@Query("SELECT e.numero,e.nom,e.prenom FROM Etudiant e JOIN e.notes n WHERE n.situation=0 AND e.promotion.annee.annee = :annee AND e.promotion.promo=:promo AND n.session='normale' GROUP BY e")
	List<Object[]> etudiantsRattrapages(String promo,String annee);

	@Query("SELECT e.numero,e.nom, e.prenom FROM Note n JOIN n.etudiant e WHERE n.unite IS NOT NULL AND n.situation = 0 AND n.session = 'rattrapage' AND e.promotion.annee.annee = :annee AND e.promotion.promo=:promo")
	List<Object[]> etudiantsRedoublants(String promo,String annee);
	
	@Query("select n.unite.code from Note n where n.etudiant.promotion.annee.annee=:annee and n.etudiant.numero=:numero and n.situation=0 and n.session='normale'")
	List<String> unitesARattrapper(String annee,String numero);
	
	@Query("select n.matiere.libelle from Note n where n.etudiant.promotion.annee.annee=:annee and n.note<10 and n.etudiant.numero=:numero and n.session='normale' and n.matiere.unite.code=:codeUnite and n.unite is null")
	List<String> matieresRatt(String annee,String numero,String codeUnite);
	
	@Query("select e.nom,e.prenom,e.numero from Note n join n.etudiant e where e.numero not in (select e2.numero from Note n2 join n2.etudiant e2 where n2.situation=0 and n2.session='rattrapage' and n2.unite is not null)"
			+ " and e.numero in (select e4.numero from Note n4 join n4.etudiant e4 where n4.session='rattrapage')"
			+ " and n.etudiant.promotion.annee.annee=:annee and n.etudiant.promotion.promo=:promo group by e")
	List<Object[]> listeAdmisApresRatt(String annee,String promo);
	
	@Query("select e.nom,e.prenom,e.numero from Note n join n.etudiant e where e.numero not in (select e2.numero from Note n2 join n2.etudiant e2 where n2.situation=0 and n2.unite is not null)"
			+ " and e.numero not in (select e4.numero from Note n4 join n4.etudiant e4 where n4.session='rattrapage')"
			+ " and n.etudiant.promotion.annee.annee=:annee and n.etudiant.promotion.promo=:promo group by e")
	List<Object[]> listeAdmisEnPrincipale(String annee,String promo);
}