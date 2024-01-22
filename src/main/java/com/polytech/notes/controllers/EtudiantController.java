package com.polytech.notes.controllers;

import java.util.List;
import java.util.Vector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.polytech.notes.models.Etudiant;
import com.polytech.notes.models.Mobilite;
import com.polytech.notes.models.Note;
import com.polytech.notes.models.RattrapageResponse;
import com.polytech.notes.models.Stage;
import com.polytech.notes.models.Unite;
import com.polytech.notes.services.EtudiantService;
import com.polytech.notes.services.NoteService;
import com.polytech.notes.services.UniteService;

@RestController
@RequestMapping("/api/etudiants")
public class EtudiantController {

	@Autowired
	private EtudiantService etudiantService;
	@Autowired
	private NoteService noteService;	
	
	@DeleteMapping("/delete/{numero}")
	public String deleteEtudiant(@PathVariable String numero) {
		etudiantService.deleteEtudiantByNumero(numero);
		return "supprimé avec succés";
	}
	
	@PostMapping("/add")
	public String addEtudiant(@RequestBody Etudiant e) {
		System.out.println(e.getPromotion().getId());
		
		Etudiant et =etudiantService.saveEtudiant(e);
		System.out.println(et);
		return "ajouté avec succés";
	}
	
	@PostMapping("/modify")
	public Etudiant modifyEtudiant(@RequestBody Etudiant e) {
		System.out.println(e);
		return etudiantService.modifyEtudiant(e);
	}
	
	@GetMapping("/get/{numero}")
	public Etudiant getEtudiant(@PathVariable String numero) {
		return etudiantService.getEtudiantByNumero(numero);
	}
	//chercher la note d'une matiere par numero d'etudiant
	@GetMapping("/note/matiere/numero/")
	public Note getNoteByMatiere(String num,String code) {
		return noteService.getNoteEtudiantByMatiere(num,code);
	}

	//http://localhost:8080/api/etudiants/note/matiere/nom/?nom=MQJQZ&prenom=EHC&code=JIN71F
	@GetMapping("/note/matiere/nom")
	public Note getNoteByMatiere(String nom,String prenom,String code) {
		return noteService.getNoteEtudiantByNomAndMatiere(nom,prenom,code);
	}
	
	@GetMapping("/note/nom")
	public Etudiant getNoteByEtudiant(String nom,String niveau) {
		return etudiantService.getNoteEtudiantByNom(nom, niveau); 
	}
	
	//http://localhost:8080/api/etudiants/note/niveau/?nom=MQJQZ&prenom=EHC&niveau=4A
//	@GetMapping("/note/niveau")
//	public List<Note> getNoteByNiveau(String nom,String prenom,String niveau) {
//		return etudiantService.getNoteAnnee(nom, prenom, niveau);
//	}
	
	@GetMapping("/note/semestre")
	public List<Object[]> getNoteBySemestre(String promo,String anneeUniv) {
		if(promo.toLowerCase().startsWith("3a")) {
			System.out.println("hellooo---------------------");
			List<Object[]> list= etudiantService.getNoteSemestre("SEM 5", promo, anneeUniv);
			if(list!=null)
				list.addAll(etudiantService.getNoteSemestre("SEM 6", promo, anneeUniv));
			return list;
		}else if(promo.toLowerCase().startsWith("4a"))
		{
			List<Object[]> list= etudiantService.getNoteSemestre("SEM 7", promo, anneeUniv);
			//System.out.println(list);
			if(list!=null)
				list.addAll(etudiantService.getNoteSemestre("SEM 8", promo, anneeUniv));
			
			System.out.println(list+"-//////////////////////////////////");
			return list;
		}
		else if(promo.toLowerCase().startsWith("5a"))
		{
			List<Object[]> list= etudiantService.getNoteSemestre("SEM 9", promo, anneeUniv);
			if(list!=null)
				list.addAll(etudiantService.getNoteSemestre("SEM 10", promo, anneeUniv));
			return list;
		}
		return null;
	}
	//http://localhost:8080/api/etudiants/note/semestre/etudiant?promo=3afise&anneeUniv=2022/2023&sem=sem 5&numero=551176
	@GetMapping("/note/semestre/etudiant")
	public List<Object[]> getNoteBySemestre(String promo,String anneeUniv,String sem,String numero) {
		return etudiantService.moyennesUniteBySem(promo, anneeUniv, sem, numero);
	}
	//http://localhost:8080/api/etudiants/note/unite/?nom=MQJQZ&prenom=EHC&codeUnite=JIN7U1B
	@GetMapping("/note/unite")
	public List<Note> getNoteOfModule(String nom,String prenom,String codeUnite) {
//		System.out.println(u);
		List<Note> list= noteService.getNoteByUnite(codeUnite, nom, prenom);
		list.add(noteService.getTotalNoteUnite(codeUnite,nom, prenom));
		return list;
	}
	
	//http://localhost:8080/api/etudiants/liste/?promo=4A&annee=2021/2022
	@GetMapping("/liste")
	public List<Etudiant> etudiants(String promo, String annee) {
//		if(promo.equals("3A"))
//			return etudiantService.getEtudiants(PromotionType.Annee3, annee);
//		if(promo.equals("4A"))
//			return etudiantService.getEtudiants(PromotionType.Annee4, annee);
//		if(promo.equals("5A"))
//			return etudiantService.getEtudiants(PromotionType.Annee5, annee);
			return etudiantService.getEtudiants(promo, annee);
//		return null;
	}
	
	//http://localhost:8080/api/etudiants/all/
	@GetMapping("/all")
	public List<Etudiant> etudiants() {
		return etudiantService.getAll();
	}
	
	@GetMapping("/lastNumero")
	public String lastEtudiant() {
		return etudiantService.lastEtudiantNumero();
	}
	
	//http://localhost:8080/api/etudiants/moyenne/?promo=4AFISA&annee=2021/2022
	@GetMapping("/moyenne")
	public List<Object[]> moyenneModulesEtudiantsByPromo(String promo, String annee){
		if(promo.equals("3A")) {
			List<Object[]> etudiants = etudiantService.getEtudiantsMoyenneModules("3afise", annee);
			etudiants.addAll(etudiantService.getEtudiantsMoyenneModules("3afisa", annee));
			return etudiants;
		}
		if(promo.equals("4A")) {
			List<Object[]> etudiants = etudiantService.getEtudiantsMoyenneModules("4afise", annee);
			etudiants.addAll(etudiantService.getEtudiantsMoyenneModules("4afisa", annee));
			return etudiants;
		}
		if(promo.equals("5A")) {
			List<Object[]> etudiants = etudiantService.getEtudiantsMoyenneModules("5afise", annee);
			etudiants.addAll(etudiantService.getEtudiantsMoyenneModules("5afisa", annee));
			return etudiants;
		}
		return etudiantService.getEtudiantsMoyenneModules(promo, annee); 
	}
	
	//http://localhost:8080/api/etudiants/rattrapages/?annee=2023&promo=4afise
	@GetMapping("/rattrapages") //etudiants qui vont passer le ratt
	public List<RattrapageResponse> listeRattrapages(String promo, String annee){
		List<Object[]> etudiants= etudiantService.getEtudiantRattrapage(promo,annee);
		List<RattrapageResponse> ratts=new Vector<RattrapageResponse>();
		for (Object[] etu : etudiants) {
			RattrapageResponse res = new RattrapageResponse(etu[0]+"", etu[1]+"", etu[2]+"",
					etudiantService.listeRattrapagesEtudiant(annee,etu[0]+""));
			ratts.add(res);
		}
		return ratts;
	}
	 
	//http://localhost:8080/api/etudiants/listeRedoublant/?annee=2023&promo=4afise
	@GetMapping("/listeRedoublant") 
	public List<Object[]> listeRedoublant(String promo, String annee){
		return etudiantService.getRedoublantsByPromotion(promo, annee);
	}
	
	@GetMapping("/notes/unite/etudiant") 
	public List<Object[]> notesUniteByEtudiant(String code, String numero,String annee){
		return noteService.getNoteByMatiereUnite(code, numero,annee);
	}
	
	//http://localhost:8080/api/etudiants/listeAdmis/?annee=2022/2023&promo=4afise
	@GetMapping("/listeAdmis") 
	public List<Object[]> listeDesAdmis(String promo, String annee){
		return etudiantService.listeDesAdmisPrin(annee, promo);
	}
	
	//http://localhost:8080/api/etudiants/listeAdmisRatt/?annee=2022/2023&promo=4afise
	@GetMapping("/listeAdmisRatt") 
	public List<Object[]> listeDesAdmisRatt(String promo, String annee){
		return etudiantService.listeDesAdmisRatt(annee, promo);
	}
		
	//http://localhost:8080/api/etudiants/addMobilite/?numero=551176
	@PostMapping("/addMobilite")
	public void mobilite(String numero,@RequestBody Mobilite mobilite){
		etudiantService.setMobilite(numero,mobilite);
	}

	@GetMapping("/stage/etudiant")
	public List<Stage> etudiantsStages(String numero){
		//System.out.println(numero+"-----------------------------");
		Etudiant e = etudiantService.getEtudiantByNumero(numero);
		//System.out.println(e.getStages().size()+"-------");
		if(e != null)  
			return e.getStages();
		return null;
	}
	
	@GetMapping("/modify/note")
	public Note modifyNoteEtudiant(Long id,double note) {
		return noteService.ModifyNote(id, note);
	}
	
}