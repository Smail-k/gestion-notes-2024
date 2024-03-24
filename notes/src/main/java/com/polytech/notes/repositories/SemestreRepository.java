package com.polytech.notes.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.polytech.notes.models.Matiere;
import com.polytech.notes.models.Semestre;

@Repository
public interface SemestreRepository extends JpaRepository<Semestre, Long>{

	Semestre findSemestreByCode(String code);
	@Query("select s.nom from Semestre s")
	List<String> getAllSemestre();
	@Query("select m from Semestre s join s.unites u join u.matieres m where s.nom=:sem")
	List<Matiere> getMatieresOfSemestre(String sem);
}
