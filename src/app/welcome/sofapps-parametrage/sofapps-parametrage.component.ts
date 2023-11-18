import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SnackBarNotifService } from 'src/app/service/snack-bar-notif.service';
import { messages } from 'src/app/Shared/utils/messages';
import { ParametrageModel } from './../../model/ParametrageModel';
import { ParametrageService } from './parametrage.service';

@Component({
  selector: 'app-sofapps-parametrage',
  templateUrl: './sofapps-parametrage.component.html',
  styleUrls: ['./sofapps-parametrage.component.css'],
})
export class SofappsParametrageComponent implements OnInit {
  myForm!: FormGroup;
  showDelay = new FormControl(0);
  param: ParametrageModel[];
  idParametrage: number = 7;
  res: ParametrageModel[];

  constructor(
    private route: Router,

    private parametrageService: ParametrageService,
    public dialogRef: MatDialogRef<SofappsParametrageComponent>,

    private translate: TranslateService,
    private snackBarNotifService: SnackBarNotifService
  ) {}

  ngOnInit(): void {
    this.loadParametrage();
  }

  loadParametrage() {
    this.parametrageService
      .getParametrageActuel()
      .subscribe((response: ParametrageModel[]) => {
        this.res = response;
        console.log(JSON.stringify(this.res));
        const majuscule = this.res.filter((p) => p.code.includes('MAJ'));
        const minuscule = this.res.filter((p) => p.code.includes('MIN'));
        const chiffre = this.res.filter((p) => p.code.includes('C'));
        const cs = this.res.filter((p) => p.code.includes('CS'));
        const cm = this.res.filter((p) => p.code.includes('CM'));
        const dmdp = this.res.filter((p) => p.code.includes('DMDP'));
        this.myForm = new FormGroup({
          majuscule: new FormControl(majuscule[0].valeur, Validators.required),
          descriptionMajuscule: new FormControl(
            majuscule[0].description,
            Validators.required
          ),
          minuscule: new FormControl(minuscule[0].valeur, Validators.required),
          descriptionMinuscule: new FormControl(
            minuscule[0].description,
            Validators.required
          ),
          chiffre: new FormControl(chiffre[0].valeur, Validators.required),
          descriptionChiffre: new FormControl(
            chiffre[0].description,
            Validators.required
          ),
          caractereSpecial: new FormControl(cs[0].valeur, Validators.required),
          descriptionCS: new FormControl(
            cs[0].description,
            Validators.required
          ),
          caractereMinimum: new FormControl(cm[0].valeur, Validators.required),
          descriptionCM: new FormControl(
            cm[0].description,
            Validators.required
          ),
          dureeMdp: new FormControl(dmdp[0].valeur, Validators.required),
          descriptionDMDP: new FormControl(
            dmdp[0].description,
            Validators.required
          ),
        });
      });
  }

  onCancel() {
    this.route.navigateByUrl('/welcome/home').then(() => {});
  }
  onSubmit() {
    this.param = [
      {
        libelle: 'majuscule',
        valeur: this.myForm.value.majuscule,
        description: this.myForm.value.descriptionMajuscule,
        code: 'MAJ',
      },

      {
        libelle: 'minuscule',
        valeur: this.myForm.value.minuscule,
        description: this.myForm.value.descriptionMinuscule,
        code: 'MIN',
      },
      {
        libelle: 'chiffre',
        valeur: this.myForm.value.chiffre,
        description: this.myForm.value.descriptionChiffre,
        code: 'C',
      },

      {
        libelle: 'caractere_speciale',
        valeur: this.myForm.value.caractereSpecial,
        description: this.myForm.value.descriptionCS,
        code: 'CS',
      },

      {
        libelle: 'caractere_minimum',
        valeur: this.myForm.value.caractereMinimum,
        description: this.myForm.value.descriptionCM,
        code: 'CM',
      },
      {
        libelle: 'duree_mdp',
        valeur: this.myForm.value.dureeMdp,
        description: this.myForm.value.descriptionDMDP,
        code: 'DMDP',
      },
    ];
    this.parametrageService.UpdateParametrage(this.param).subscribe({
      next: (res) => {
        this.snackBarNotifService.openSnackBarSuccess(
          messages.parametrage,

          this.translate.instant(messages.fermer)
        );

        this.dialogRef.close(res);
      },
      error: (error) => {
        this.snackBarNotifService.openSnackBarFailure(
          messages.parametrageEchoue,

          this.translate.instant(messages.fermer)
        );

        this.dialogRef.close(error);
      },
    });
  }
}
