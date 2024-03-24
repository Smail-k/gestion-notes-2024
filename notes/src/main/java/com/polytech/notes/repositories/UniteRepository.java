package com.polytech.notes.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.polytech.notes.models.Unite;

@Repository
public interface UniteRepository extends JpaRepository<Unite, Long>{
	
	Unite findUniteBylibelle(String libelle);
	Unite findUniteByCode(String code);
	List<Unite> findUniteBySemestreNom(String nom);
	
	@Query("SELECT n.unite.code,n.note FROM Note n INNER JOIN n.unite u INNER JOIN n.etudiant e WHERE n.situation = false AND e.promotion.annee.annee=:annee AND e.numero = :etudiant AND n.session='normale'")
	List<Object[]> getUniteNonValidee(String annee,String etudiant);
	
	@Query("SELECT n.matiere.libelle,n.note FROM Note n JOIN n.matiere m WHERE n.etudiant.numero = :etudiant AND m.unite.code = :unite AND n.note<10")
	List<Object[]> getMatiereNonValidee(String etudiant,String unite);
}
