import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-modifier-note',
  templateUrl: './modifier-note.component.html',
  styleUrls: ['./modifier-note.component.css']
})
export class ModifierNoteComponent implements OnInit {
  form! :FormGroup;
  constructor(private fb: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any,private service : NoteService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
    
      note:new FormControl(this.data.note.moyenne ,[Validators.required])
    })
  }
  get f (){ return this.form.controls }
  onModify(){
    return this.service.modifyNote(this.data.note.idNote,this.f.note.value).subscribe(()=>{

    })
  }



}
