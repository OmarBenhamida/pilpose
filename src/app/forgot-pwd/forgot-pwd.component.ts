import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Constants } from '../login-admin/utils/constants';
import { ForgotPwdService } from './forgot-pwd.service';
import { forgotPwdModel } from './forgotPwd.model';

@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.component.html',
  styleUrls: ['./forgot-pwd.component.css'],
})
export class ForgotPwdComponent implements OnInit {
  imageUrl: string = 'assets/img/pilposepic.jpeg';
  myForm: FormGroup = new FormGroup({});
  constructor(
    private formBuilder: FormBuilder,
    private forgotPwdService: ForgotPwdService,
    public toast: ToastrService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      mail: ['', Validators.required],
    });
  }

  onSubmit() {
    
    let user: forgotPwdModel = {
      mail: this.myForm.get('mail').value,
    };

    console.log(user);
    this.forgotPwdService
      .forgotPwd(user)
      .then((res) => {
        this.toast.success(
          this.translate.instant(
            'Email de rénitialisation de mot de passe envoyé avec succés'
          ),
          '',
          Constants.toastOptions
        );
        //this.router.navigate(['pilpose/comptes']);
        window.location.reload();
      })
      .catch((error) => {
        this.toast.error(
          this.translate.instant(
            'Erreur lors de la renitialisation du mot de passe'
          ),
          '',
          Constants.toastOptions
        );
      });
  }
}
