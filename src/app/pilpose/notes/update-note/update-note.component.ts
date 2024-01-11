import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Chantier } from 'src/app/model/chantier.model';
import { Collaborateur } from 'src/app/model/collaborateur.model';
import { NoteFrais } from 'src/app/model/note-frais.model';
import { ChantierService } from '../../chantier/chantier.service';
import { CompteService } from '../../comptes/compte.service';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.css'],
})
export class UpdateNoteComponent implements OnInit {
  NoteForm: UntypedFormGroup;
  NoteFormToAlter: any;
  comptes: Collaborateur[] = [];
  idCollaborateur: Collaborateur;
  selectedFile: File | null = null;
  listChantiers: Chantier[] = [];
  idChantier: Chantier;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    public dialogRef: MatDialogRef<UpdateNoteComponent>,
    private compteService: CompteService,
    private chantierService: ChantierService,
    public toastr: ToastrService,
    public translate: TranslateService,
    public formBuilder: UntypedFormBuilder
  ) {
    this.NoteFormToAlter = this.data.note;
  }

  ngOnInit(): void {
    this.getAllCollab();
    this.getAllChantier();
    console.log('++++++s++++++', this.NoteFormToAlter);
    this.NoteForm = this.formBuilder.group({
      idNoteFrais: new UntypedFormControl(this.NoteFormToAlter.idNoteFrais),
      reference: new UntypedFormControl(this.NoteFormToAlter.reference),
      typeNote: new UntypedFormControl(
        this.NoteFormToAlter.typeNote,
        Validators.required
      ),
      dateNote: new UntypedFormControl(
        this.NoteFormToAlter.dateNote,
        Validators.required
      ),

      recu: new UntypedFormControl(
        this.NoteFormToAlter.recu,
        Validators.required
      ),
      idCollaborateur: new UntypedFormControl(
        this.NoteFormToAlter.idCollaborateur.idCollaborateur,
        Validators.required
      ),
 
    });
  }

  getAllCollab() {
    this.compteService
      .getAllComptes()
      .then((res: any[]) => {
        for (let compte of res) {
          console.log(compte);

          this.comptes.push({
            idCollaborateur: compte.idCollaborateur,
            nom: compte.nom,
            prenom: compte.prenom,
            fonction: compte.fonction,
            dateEmbauche: compte.dateEmbauche,
            email: compte.email,
            dateNaissance: compte.dateNaissance,
            adresse: compte.adresse,
            telephone: compte.telephone,
            username: compte.username,
            password: compte.password,
          });
        }
      })
      .catch((err) => {});
  }

  getAllChantier() {
    this.chantierService
      .getAllChantier()
      .then((res) => {
        for (let ref of res) {
          this.listChantiers.push({
            idChantier: ref.idChantier,
            reference: ref.reference,
            clientDto: ref.clientDto,
            nomCompletClient: ref.nomCompletClient,
            etat: ref.etat,
            nomChantier: ref.nomChantier,
            localisationDto: ref.localisationDto,
            ville: ref.ville,
          });
        }
      })
      .catch((err) => {});
  }

  onSubmit() {
    let note;
    let typeNote: String = this.NoteForm.get('typeNote').value;
    let dateNote: String = this.NoteForm.get('date').value;
    let idCollaborateur: number = this.NoteForm.get('idCollaborateur').value;
   //let idChantier: number = this.NoteForm.get('idChantier').value;
    let recu: File = this.NoteForm.get('recu').value;

    note = new NoteFrais();

    note.idNoteFrais = this.NoteFormToAlter.idChantier;
    note.reference = this.NoteFormToAlter.reference;

    note.typeNote = typeNote;
    note.dateNote = dateNote;
    note.recu = recu;

    let Collaborateur: Collaborateur = {
      idCollaborateur: idCollaborateur,
    };
    note.idCollaborateur = Collaborateur;

   // let chantier: Chantier = {
     // idChantier: idChantier,
    //};
    //note.idChantier = chantier;

    this.router.navigate(['pilpose/note']);
    console.log('log to alter ', note);

    this.sendDataToUpdate(note);
  }

  sendDataToUpdate(data: NoteFrais) {
    this.dialogRef.close(data);
  }
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  close() {
    this.dialogRef.close();
  }
}
