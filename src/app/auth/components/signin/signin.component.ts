import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
  }

  userForm = this.fb.group({
    email: ['samuel@wecolearn.com', [Validators.required, Validators.email]],
    password: ['admin1234', [Validators.required, Validators.minLength(6)]],
  });

  ngOnInit() {
  }

  get emailControl() {
    return this.userForm.get('email');
  }

  get passwordControl() {
    return this.userForm.get('password');
  }

  openSnackBar(message: string, action: string ) {
    this._snackBar.open(message , "", {
      duration: 2000,
    });
  }
  signin() {

    console.log('submitted : ');

    // toutes les données du formulaire
    console.log(this.userForm.getRawValue());

    this.authService.signin(
      this.emailControl.value,
      this.passwordControl.value
    ).subscribe(
      (result) => {
        // connexion est réussie !
        this.router.navigate(['dash/home']);
        this.openSnackBar("You've signed in successfuly", "null");
      },
      (err) => {
        // on peut dire à l'utilisateur qu'il n'a pas donné les bons identifiants
        console.log({ err });
      });
  }








}
