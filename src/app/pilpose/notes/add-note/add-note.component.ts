import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CompteService } from '../../comptes/compte.service';
import { AddAffectationService } from '../../tache/affectation/add-affectation/addAffectation.service';
import { TacheService } from '../../tache/tache.service';
import { ChantierService } from '../../chantier/chantier.service';
import { NoteFrais } from 'src/app/model/note-frais.model';
import { Chantier } from 'src/app/model/chantier.model';
import { Collaborateur } from 'src/app/model/collaborateur.model';
import { AddNoteService } from './addNote.service';
import { Constants } from 'src/app/Shared/utils/constants';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css'],
})
export class AddNoteComponent implements OnInit {
  NoteForm: UntypedFormGroup;
  selectedFile: File | null = null;
  comptes: any[] = [];
  listChantiers: any[] = [];
  constructor(
    private router: Router,
    public toast: ToastrService,
    public translate: TranslateService,
    public formBuilder: UntypedFormBuilder,
    private noteService: AddNoteService,
    private tacheService: TacheService,
    private compteService: CompteService,
    private http: HttpClient,
    private chantierService: ChantierService
  ) {}

  ngOnInit(): void {
    this.getAllCollab();
    this.getAllChantier();

    this.NoteForm = this.formBuilder.group({
      idNote: new UntypedFormControl(''),
      typenote: new UntypedFormControl('', Validators.required),
      date: new UntypedFormControl('', Validators.required),
      collab: new UntypedFormControl('', Validators.required),
      recu: new UntypedFormControl('', Validators.required),
      chantier: new UntypedFormControl('', Validators.required),
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    let typenote: String = this.NoteForm.get('typenote').value;
    let date: String = this.NoteForm.get('date').value;
    let idCollaborateur: number = this.NoteForm.get('collab').value;
    let idChantier: number = this.NoteForm.get('chantier').value;
    let recu: File = this.NoteForm.get('recu').value;

    let note = new NoteFrais();
    note.idCollaborateur = new Collaborateur(idCollaborateur);
    note.idChantier = new Chantier(idChantier);
    note.typeNote = typenote;
    note.dateNote = date;
    note.recu = null;

    this.noteService
      .addOrUpdateNote(note)
      .then((res) => {
        this.toast.success(
          this.translate.instant('Note de Frais ajoutée avec succés'),
          '',
          Constants.toastOptions
        );

        this.onUpload(res.idNoteFrais);
        this.router.navigate(['pilpose/note']);
      })
      .catch((error) => {
        this.toast.error(
          this.translate.instant(
            'Erreur lors de la création d une Note de frais'
          ),
          '',
          Constants.toastOptions
        );
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
            cin: compte.cin,
            nationalite: compte.nationalite,
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
            id: ref.idChantier,
            reference: ref.reference,
            nomChantier: ref.nomChantier,
          });
        }
      })
      .catch((err) => {});
  }

  onUpload(id: number): void {
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.http.post('http://localhost:8888/note/recu/' + id, formData).subscribe(
      () => {
        console.log('File uploaded successfully');
        // Handle success
      },
      (error) => {
        console.error('Error uploading file:', error);
        // Handle error
      }
    );
  }
}
