package com.polytech.notes.controllers;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.polytech.notes.models.AnneeUniversitaire;
import com.polytech.notes.models.Etudiant;
import com.polytech.notes.models.Matiere;
import com.polytech.notes.models.Note;
import com.polytech.notes.models.Promotion;
import com.polytech.notes.models.Semestre;
import com.polytech.notes.models.Session;
import com.polytech.notes.models.Unite;
import com.polytech.notes.parsers.ExcelParser;
import com.polytech.notes.services.AnneeUnivService;
import com.polytech.notes.services.EtudiantService;
import com.polytech.notes.services.MatiereService;
import com.polytech.notes.services.NoteService;
import com.polytech.notes.services.PromotionService;
import com.polytech.notes.services.PromotionServiceDefault;
import com.polytech.notes.services.SemestreService;
import com.polytech.notes.services.UniteService;

@RestController
@RequestMapping("/api")
public class ImportController {

	@Autowired 
	private SemestreService semestreService;
	@Autowired
	private UniteService uniteService;
	@Autowired
	private MatiereService matiereService;
	@Autowired
	private EtudiantService etudiantService;
	@Autowired
	private NoteService noteService;
	@Autowired
	private PromotionService promoService;
	@Autowired
	private AnneeUnivService anneeService;
	
	
	@PostMapping("/excel")
	public String excelReader(@RequestParam("file") MultipartFile excel) {
		
		ExcelParser parser = new ExcelParser();
		String parsingMessage = parser.excelReader(excel);
		if(!parsingMessage.equals("success"))
			return "Erreur de format de fichier (contenu)";
		
		String feedback="importation avec succée";
		
		List<Semestre> semestres = parser.getSemestres();
		if(semestres.size()==0)
			return "erreur d'importation vers la base de donnees !";
		for (Semestre semestre : semestres) {
			Semestre s= semestreService.saveSemestre(semestre);
			if(s==null)
				feedback="erreur d'importation vers la base de donnees !";
		}
		
		return feedback;
		
	}
	
	@ResponseBody
	@PostMapping("/excel/etudiant")
	public String importEtudiants(@RequestParam("file") MultipartFile excel,@RequestParam("promo") String promo,@RequestParam("annee") String annee) {
		
		AnneeUniversitaire a =anneeService.getAnneeUniversitaire(annee);
		Promotion p=null;
		if(a==null) {
			AnneeUniversitaire anneeUn= anneeService.add(new AnneeUniversitaire(annee));
			p=promoService.addPromotion(new Promotion(promo, anneeUn));
		}
		else 
			p=promoService.addPromotion(new Promotion(promo, a));

		
		ExcelParser parser = new ExcelParser();
		String result = parser.importEtudiants(excel,p);
		if(result == "error")
			return result;
		List<Etudiant> etudiants = parser.getEtudiants();
		
		
		for (Etudiant e : etudiants) {
			Etudiant et = etudiantService.saveEtudiant(e);
			if(et==null)
				result="erreur d'ajout de certain etudiants !!";
		}
		
		System.out.println(result+"-----------------------");
		return result;
	}
	
	@PostMapping("excel/note")
	public String importNotes(@RequestParam("file") MultipartFile excel,@RequestParam("session") String session) {
		ExcelParser parser = new ExcelParser();
		parser.importNotes(excel,session);
		List<Note> notes = parser.getNotes();
		Note test=null;
		for (Note note : notes) {
			Etudiant e = etudiantService.getEtudiantByNumero(note.getEtudiant().getNumero());
			note.setEtudiant(e);
			note.setMatiere(matiereService.findMatiereByCode(note.getMatiere().getCode()));
			//note.setUnite(note.getMatiere().getUnite());
			note.setAnnee(e.getPromotion().getAnnee().getAnnee());
			note.setSituation(note.getNote()<6 ? false : true);
			note.setSession(session.equals("normale") ? Session.normale : Session.rattrapage);
			test = noteService.saveNote(note);
			if(session.equals("rattrapage"))
				System.out.println(test.getId()+"--/////////-"+test.getSession());
		}
		if(session.equals("rattrapage"))
			System.out.println(notes.size()+"****");
		for (Note note : notes) {
			String uniteCode= note.getMatiere().getUnite().getCode();
			String etudiantNumero= note.getEtudiant().getNumero();
			
			Note n = noteService.getNoteByUniteCodeAndEtudiantNumero(uniteCode, etudiantNumero);
			
			List<Note> list = noteService.getListNoteByMatiereUnite(uniteCode, etudiantNumero,note.getEtudiant().getPromotion().getAnnee().getAnnee());
			double noteModule=0;
			boolean noNoteEliminatoire=true;
			for (Note noteMatiere : list) {
				
				if(noteMatiere.getNote()<10 && noteMatiere.getSession()==Session.normale) {
					
					Note noteRatt= noteService.getNoteEtudiantBySession(noteMatiere.getMatiere().getCode(),Session.rattrapage,noteMatiere.getEtudiant().getNumero());
					if(noteRatt==null) {
						noteModule+=noteMatiere.getNote()*noteMatiere.getMatiere().getCoefficient();
						if(noteMatiere.getNote()<6)
							noNoteEliminatoire=false;
					}
				}else {
					noteModule+=noteMatiere.getNote()*noteMatiere.getMatiere().getCoefficient();
					if(noteMatiere.getNote()<6)
						noNoteEliminatoire=false; //il ya une note eliminatoire dans cette ue
				}
			}
			noteModule/=note.getMatiere().getUnite().getCoefficient();
			if(n==null) {
				
				n=new Note();
				n.setNote(noteModule);
				n.setEtudiant(note.getEtudiant());
				n.setAnnee(note.getEtudiant().getPromotion().getAnnee().getAnnee());
				n.setUnite(note.getMatiere().getUnite());
				n.setSituation(noteModule>=10 ? true : false);
				if(noteModule>=10) //meme si >=10 on verifie la note eliminatoire
					n.setSituation(noNoteEliminatoire); // s'il ya note eliminatoire alors pas validée
				n.setSession(session.equals("normale") ? Session.normale : Session.rattrapage);

				noteService.saveNote(n);
			}
			else {
				n.setNote(noteModule);
				n.setSituation(noteModule>=10 ? true : false);
				if(noteModule>=10) //meme si >=10 on verifie la note eliminatoire
					n.setSituation(noNoteEliminatoire); // s'il ya note eliminatoire alors pas validée
				n.setSession(session.equals("normale") ? Session.normale : Session.rattrapage);
				noteService.saveNote(n);
			}
			
		}
		
		return test==null ? "erreur d'ajout de certaines notes !" : "notes bien ajoutées";
	}
}